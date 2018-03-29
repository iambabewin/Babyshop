import request from '../utils/request';

export async function addGood(params) {
  return request('/api/goods/', {
    method: 'POST',
    body: JSON.stringify({ ...params }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function getGoods(params = {page: 1, pageSize: 8}) {
  return request(`/api/goods/?page=${params.page}&pageSize=${params.pageSize}`);
}