import request from '../utils/request';

export async function login(params) {
  return request('/api/tokens/', {
    method: 'POST',
    body: JSON.stringify({ ...params }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function logout(params) {
  return request('/api/tokens/', {
    method: 'DELETE',
  });
}

export async function fetchAdminInfo(params) {
  return request('/api/admins/');
}