import { request } from './request';
export async function login(data) {
  return request({
    url: '/user/login',
    method: 'POST',
    data,
  });
}

export async function register(data) {
  return request({
    url: '/user/register',
    method: 'POST',
    data,
  });
}
export async function logout() {
  return request({
    url: '/user/logout',
    method: 'GET',
  });
}

export async function checklogin() {
  return request({
    url: '/user/checklogin',
    method: 'GET',
  });
}