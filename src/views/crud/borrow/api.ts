// api.js

// 请求真实后端
import { request } from '../../../api/service'

const apiPrefix = '/borrow'

export function GetList(query: any) {
  return request({
    url: apiPrefix + '/page',
    method: 'post',
    data: query,
  })
}

export function AddObj(obj: any) {
  console.log(obj)
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

export function DelObj(SN: number) {
  return request({
    url: apiPrefix + '/delete',
    method: 'post',
    params: { SN },
  })
}

export function GetStuInfo(sno: string) {
  return request({
    url: '/stu' + '/info',
    method: 'get',
    params: { sno },
  })
}

export function GetBookInfo(id: number) {
  return request({
    url: '/book' + '/info',
    method: 'get',
    params: { id },
  })
}

export function GetObj(id: number) {
  return request({
    url: apiPrefix + '/info',
    method: 'get',
    params: { id },
  })
}

export function BatchDelete(SNs: Array<number>) {
  return request({
    url: apiPrefix + '/batchDelete',
    method: 'post',
    data: { SNs },
  })
}
