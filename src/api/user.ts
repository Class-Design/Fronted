import { request } from './request';
export async function getInfo() {
    return request({
        url: '/user/info',
        method:'GET'
    });
}

export async function getList(params) {
    return request({
        url: '/user/getList',
        params,
    });
}

export async function remove(data) {
    return request({
        url: '/user',
        method: 'delete',
        data,
    });
}

export async function updateDetail(data) {
    return request({
        url: '/userDetail/update',
        method: 'post',
        data,
    });
}

