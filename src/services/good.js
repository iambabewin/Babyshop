import request from '../utils/request';

export function addGood({ int_categoryId, name, float_price, bool_hot, bool_recomment, property, preview, detail }) {
  return request('/api/goods/', {
    method: 'POST',
    body: JSON.stringify({ int_categoryId, name, float_price, bool_hot, bool_recomment, property, preview, detail }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}