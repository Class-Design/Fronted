import React from 'react';
import {
  Tooltip,
  Button,
  Avatar,
  Typography,
  Dropdown,
  Menu,
  Space,
  Message,
} from '@arco-design/web-react';
import { IconSunFill, IconMoonFill } from '@arco-design/web-react/icon';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerState } from '../../redux';
import useLocale from '../../utils/useLocale';
import Logo from '../../assets/logo.svg';
import history from '../../history';
import { logout } from '../../api/login';

// import MessageBox from '../MessageBox';

import styles from './style/index.module.less';

function Navbar() {
  const locale = useLocale();
  const theme = useSelector((state: ReducerState) => state.global.theme);
  // const userInfo = useSelector((state: ReducerState) => state.login.userInfo);
  const isLogin=localStorage.getItem('isLogin')
  const dispatch = useDispatch();
  // const [name,setName]=useState("测试用户")
  // const name =localStorage.getItem('name');
  const name=localStorage.getItem('name')
  const onMenuItemClick = async (key) => {
    if (key === 'logout') {
      const res: any = await logout();
      if (res.code === '200') {
        localStorage.removeItem('isLogin');
        localStorage.removeItem('authority');
        Message.success(res.message);
        history.push('/admin/login');
      }
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <Space size={8}>
          <Logo />
          <Typography.Title style={{ margin: 0, fontSize: 18 }} heading={5}>
            图书管理后台系统
          </Typography.Title>
        </Space>
      </div>
      <ul className={styles.right}>
        {/* <li>
          <MessageBox />
        </li>
        <li>
          <a>{locale['navbar.docs']}</a>
        </li> */}
        {/* <li>
          <Select
            options={[
              { label: '中文', value: 'zh-CN' },
              { label: 'English', value: 'en-US' },
            ]}
            value={localStorage.getItem('arco-lang')}
            bordered={false}
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: 'bl',
            }}
            onChange={(value) => {
              localStorage.setItem('arco-lang', value);
              window.location.reload();
            }}
          />
        </li> */}
        <li>
          <Tooltip
            content={
              theme === 'light'
                ? locale['settings.navbar.theme.toDark']
                : locale['settings.navbar.theme.toLight']
            }
          >
            <Button
              type="text"
              icon={theme === 'light' ? <IconMoonFill /> : <IconSunFill />}
              onClick={() =>
                dispatch({
                  type: 'toggle-theme',
                  payload: { theme: theme === 'light' ? 'dark' : 'light' },
                })
              }
              style={{ fontSize: 20 }}
            />
          </Tooltip>
        </li>
        {isLogin && (
          <li>
            <Avatar size={24} style={{ marginRight: 8 }}>
              <img alt="avatar" src='https://fireinsect.top/pic.jpg' />
            </Avatar>
            <Dropdown
              trigger="click"
              droplist={
                <div>
                  <Menu onClickMenuItem={onMenuItemClick}>
                    <Menu.Item key="logout">退出登录</Menu.Item>
                  </Menu>
                </div>
              }
            >
              <Typography.Text className={styles.username}>{name}</Typography.Text>
            </Dropdown>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
