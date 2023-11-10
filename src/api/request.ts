import axios from 'axios';
import { Notification } from '@arco-design/web-react';
export const request = (config) => {
  const http = axios.create({
    baseURL: 'http://127.0.0.1:8081/',
    withCredentials:true
    // timeout: 5000,
  });
  

  // 请求拦截
  http.interceptors.request.use(
    (config) => {
      if (config.method === 'put' || config.method === 'delete') {
        const id = config.data._id || config.data.id;
        config.url += `/${id}`;
      }
      console.log('config', config);
      const token = localStorage.getItem('token');
      config.headers = {
        Authorization: 'Bearer ' + token,
        ...config.headers,
      };
      return config;
    },
    () => {}
  );

  // 响应拦截
  http.interceptors.response.use(
    (res) => {
      console.log('res-------', res);
      if (res.data.code ==='401') {
        location.href = '/#/admin/login';
        Notification.error({ title: '权限错误', content: '请重新登录' });
      }
      return res.data ? res.data : res;
    },
  );

  return http(config);
};
