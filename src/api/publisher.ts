import { request } from "./request";

export async function get(params) {
    return request({
      url: '/publisher/get',
      method: 'GET',
      params
    });
  }
  