import { request } from './request';

export async function getList(params) {
  return request({
    url: '/book/list',
    params,
  });
}

export async function myBorrow(params) {
  return request({
    url: '/borrow/myBorrow',
    params,
  });
}
export async function queryDetail(params) {
  return request({
    url: `/bookDetail/list/${params}`,
    method: 'get',
  });
}

export async function borrow(data) {
  return request({
    url: '/borrow/borrow',
    method: 'post',
    data,
  });
}
export async function returnBook(data) {
  return request({
    url: '/borrow/return',
    method: 'post',
    data,
  });
}
export async function reserveBook(data) {
  return request({
    url: '/borrow/reserve',
    method: 'post',
    data,
  });
}
