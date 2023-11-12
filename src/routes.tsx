import React from 'react';
import {
  IconStorage,
  IconUser,
  IconBook,
} from '@arco-design/web-react/icon';

export const defaultRoute = 'borrow';

export const routes = [
  {
    name: '图书借阅',
    icon: <IconBook />,
    key:'borrow',
    authority:1,
    children:[
       { 
        name: '借阅',
        key:'borrow',
        icon: <IconBook />,
        componentPath: 'borrow',
        authority:1,
      },
      { 
        name: '我的借阅',
        key:'my-borrow',
        icon: <IconBook />,
        componentPath: 'my-borrow',
        authority:1,
      }
    ]
  },
  {
    name: '图书管理',
    key: 'book-manage',
    icon: <IconStorage />,
    componentPath: 'book-manage',
    authority:2,
  },
  {
    name: '借阅详情',
    key: 'borrow-manage',
    icon: <IconUser />,
    componentPath: 'borrow-manage',
    authority:2
  },
  {
    name: '书本详情',
    key: 'book-manage/detail',
    icon: <IconBook />,
    componentPath: 'book-manage/detail',
    hide: true,
  },
  {
    name: '用户管理',
    key: 'user',
    icon: <IconUser />,
    componentPath: 'user',
    authority:3
  },
  {
    name: '我的信息',
    key: 'info',
    icon: <IconUser />,
    componentPath: 'info',
    authority:1
  },
];
