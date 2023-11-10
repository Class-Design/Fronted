import { request } from './request';

export async function getList(params) {
    return request({
        url: '/book-manage/list',
        params,
    });
}

export async function addBook(data) {
    return request({
        url: '/book/add',
        method:'post',
        data,
    });
}

export async function update(data) {
    return request({
        url: '/book/update',
        method: 'post',
        data,
    });
}

export async function queryDetail(params) {
    return request({
      url: `/bookDetail/list/${params}`,
      method: 'get',
    });
  }

export async function updateDetail(data) {
return request({
    url: `/bookDetail/update`,
    method: 'post',
    data
});
}


