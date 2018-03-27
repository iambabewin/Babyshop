import * as goodServeices from '../services/good';
import { message } from 'antd';

export default {

  namespace: 'good',

  state: {
    
  },

  subscriptions: {
    setup({ dispatch, history }) { 

    },
  },

  effects: {
    *addGood({ payload }, { call, put }) { 
      console.log('add')
      const { data } = yield call(goodServeices.addGood, payload);
    
      if(data && data.code === 200) {
        message.success(data.msg);
      } else {
        message.error(data.msg);
      }
    },
  },

  reducers: {
    save(state, action) {
    return { ...state, ...action.payload };
    },
  },

};