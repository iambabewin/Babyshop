import request from '../utils/request';

export async function AddCategory(params) {
  return request('/api/categories/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ ...params }),
  });
}

export async function DelCategory(params) {
  return request(`/api/categories/?int_id=${params.int_id}`, {
    method: 'DELETE',
  });
}

export async function GetCategory(params) {
  return request(`/api/categories/?page=${params.page}&pageSize=${params.pageSize}`);
}