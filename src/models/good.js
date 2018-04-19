import * as goodServeices from '../services/good';
import { message } from 'antd';

export default {

  namespace: 'good',

  state: {
    goodsList:{
      list: []
    }
  },

  subscriptions: {
    setup({ dispatch, history }) { 

    },
  },

  effects: {
    *addGood({ payload }, { call, put }) { 
      // console.log('add')
      const { data } = yield call(goodServeices.addGood, payload);
      if(data && data.code === 200) {
        message.success(data.msg);
        // console.log(data.code);
        return data.code;
      } else {
        message.error(data.msg);
      }
    },

    *delGood({ payload }, { call, put }) {
      const { data } = yield call(goodServeices.delGood, payload);
      // console.log(data)
      if (data && data.code === 200) {
        message.success(data.msg);
        return data.code;
      } else {
        message.error(data.msg || '删除商品失败')
      }
    },

    *getGoods({ payload }, { call, put }) {
      try {
        const {data} = yield call(goodServeices.getGoods, payload);
        // console.log(data);
        if (data && data.code === 200) {
          yield put({ type: 'save',
          payload: { goodsList: data.data } });
          return data.data;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

  },

  reducers: {
    save(state, action) {
    return { ...state, ...action.payload };
    },
  },

};