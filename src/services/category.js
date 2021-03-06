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

export async function GetCategory(params = {page:1,pageSize:8}) {
  return request(`/api/categories/?page=${params.page}&pageSize=${params.pageSize}`);
}

export async function EditCategory(params) {
  return request('/api/categories/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ ...params }),
  });
}