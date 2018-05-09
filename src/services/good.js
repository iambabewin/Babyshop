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

export async function getGoods(params) {
  return request(`/api/goods/?page=${params.page}&pageSize=${params.pageSize}&search=${params.search}&categoryId=${params.categoryId}`);
}

export async function delGood(params) {
  return request(`/api/goods/?int_id=${params.int_id}`, {
    method: 'DELETE',
  });
}
export async function editGood(params) {
  return request(`/api/goods/`, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    },
  });
}