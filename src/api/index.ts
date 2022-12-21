//自定的一些api

import { request } from './service'

const infoApiPrefix = '/info'

export function GetSumBook() {
  return request({
    url: infoApiPrefix + '/sum/book',
    method: 'get',
    data: {},
  })
}

export function GetSumStudent() {
  return request({
    url: infoApiPrefix + '/sum/stu',
    method: 'get',
    data: {},
  })
}

export function GetSumBorrow() {
  return request({
    url: infoApiPrefix + '/sum/borrow',
    method: 'get',
    data: {},
  })
}

export function GetSumFine() {
  return request({
    url: infoApiPrefix + '/sum/fine',
    method: 'get',
    data: {},
  })
}

export function GetBookRank(value: string) {
  return request({
    url: infoApiPrefix + '/book/rank',
    method: 'get',
    params: { value },
  })
}

export function GetBookData() {
  return request({
    url: infoApiPrefix + '/book/data',
    method: 'get',
  })
}
