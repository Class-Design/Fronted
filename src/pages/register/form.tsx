import { Form, Input, Button, Space, Message } from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconEmail, IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useRef, useState } from 'react';

import styles from './style/index.module.less';
import history from '../../history';
import useLocale from '../../utils/useLocale';
import { register as adminRegister } from '../../api/login';

export default function RegisterForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  const [password,setPassword]=useState('');
  function afterRegisterSuccess() {
    Message.success('注册成功！');
    // 跳转首页
    toLogin();
  }

  async function register(params) {
    setErrorMessage('');
    setLoading(true);
    try {
      const res = await adminRegister(params);
      if (res.data) {
        if ((res as any).code === '200') {
          afterRegisterSuccess();
        }
      } else {
        Message.error("注册失败："+(res as any).message)
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  async function onSubmitClick() {
    formRef.current.validate().then((values) => {
        register(values);
    });
  }
  async function toLogin() {
    window.location.href = history.createHref({
      pathname: '/admin/login',
    });
  }
  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>图书馆管理后台系统</div>
      <div className={styles['login-form-sub-title']}>注册图书馆管理后台系统</div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form className={styles['login-form']} layout="vertical" ref={formRef}>
        <Form.Item
          field="userName"
          rules={[
            { required: true, message: locale['login.p_userName'] },
            {
              match: /^[\u4E00-\u9FA5A-Za-z0-9_]{4,20}$/,
              message: locale['login.p_userName_pattern'],
            },
          ]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={locale['login.p_userName']}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[
            { required: true, message: locale['login.p_password'] },
            {
              match: /^[A-Za-z0-9_]{6,20}$/,
              message: locale['login.p_password_pattern'],
            },
          ]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={locale['login.p_password']}
            onChange={(value)=>{
              setPassword(value)
            }}
          />
        </Form.Item>
        <Form.Item
          field="rePassword"
          rules={[
            { required: true, message: '请再次输入密码'},
            {
              match: /^[A-Za-z0-9_]{6,20}$/,
              message: locale['login.p_password_pattern'],
            },
            {
              validator: async (value, callback) => {
                return new Promise((resolve) => {
                  if (value !== password) {
                    callback('两次密码不一致');
                    resolve();
                  } else {
                    resolve();
                  }
                });
              },
            },
          ]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder='请再次输入密码'
          />
        </Form.Item>

        {/* <Form.Item
          field="name"
          rules={[
            { required: true, message: '请输入姓名'},
          ]}
        >
          <Input
            prefix={<IconRobot />}
            placeholder='请输入姓名'
          />
        </Form.Item> */}
        {/* <Form.Item
          field="classs"
          rules={[
            { required: true, message: '请输入班级'},
          ]}
        >
          <Input
            prefix={<IconStamp />}
            placeholder='请输入班级'
          />
        </Form.Item> */}
        {/* <Form.Item
          field="age"
          rules={[
            { required: true, message: '请输入年龄'},
          ]}
        >
          <InputNumber
            prefix={<IconGift />}
            placeholder='请输入年龄'
          />
        </Form.Item> */}
        {/* <Form.Item
          field="sex"
          rules={[
            { required: true, message: '请选择性别'},
          ]}
        >
          <Select  
          prefix={<IconMan />}
          placeholder="请选择用户性别">
                                {[
                                    {
                                        key: '男',
                                        value: '男',
                                    },
                                    {
                                        key: '女',
                                        value: '女',
                                    },
                                    // ...categoriesArr,
                                ].map((item) => (
                                    <Select.Option key={item.key} value={item.value}>
                                        {item.value}
                                    </Select.Option>
                                ))}
                            </Select>
        </Form.Item> */}
        {/* <Form.Item
          field="location"
          rules={[
            { required: true, message: '请输入地址'},
          ]}
        >
          <Input
            prefix={<IconLocation />}
            placeholder='请输入地址'
          />
        </Form.Item> */}
        <Form.Item
          field="mobile"
          rules={[
            { required: true, message: '请输入电子邮箱'},
            { match:/[\w]+@[A-Za-z]+(\.[A-Za-z0-9]+){1,2}/,message:'请输入正确的邮箱'}
          ]}
        >
          <Input
            prefix={<IconEmail />}
            placeholder='请输入电子邮箱'
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          {/* <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              记住密码
            </Checkbox>
            <Link>忘记密码？</Link>
          </div> */}
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            注册
          </Button>
          <Button type="text" long onClick={toLogin} className={styles['login-form-register-btn']}>
            账号登录
          </Button>
        </Space>
      </Form>
    </div>
  );
}
