// api.js

// 请求真实后端
import { request } from '../../../api/service'

const apiPrefix = '/info/stu'

export function GetList(query: any) {
  return request({
    url: apiPrefix + '/page',
    method: 'post',
    data: query,
  })
}

export function AddObj(obj: any) {
  return request({
    url: apiPrefix + '/add',
    method: 'post',
    data: obj,
  })
}

export function UpdateObj(obj: any) {
  return request({
    url: apiPrefix + '/update',
    method: 'post',
    data: obj,
  })
}

export function DelObj(sno: string) {
  return request({
    url: apiPrefix + '/delete',
    method: 'post',
    params: { sno },
  })
}

export function GetObj(sno: string) {
  return request({
    url: apiPrefix + '/info',
    method: 'get',
    params: { sno },
  })
}
