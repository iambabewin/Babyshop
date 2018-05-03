import createServices from '../utils/services';

export default createServices({
  fetchOrder: {
    url: '/api/orders/',
    method: 'GET',
  },
  deliver: {
    url: '/api/orders/',
    method: 'PUT',
  },
});
