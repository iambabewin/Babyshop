import createModels from '../utils/models';
import orderServices from '../services/order';
import { message } from 'antd';

export default createModels({
  namespace: 'order',
  state: {
    orderListInfo: {},
  },
  effects: {
    fetch: {
      service: orderServices.fetchOrder,
      save: 'orderListInfo',
    },
  },
});
