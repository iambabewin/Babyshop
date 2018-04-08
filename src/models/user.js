import * as userServeices from '../services/user';
import { message } from 'antd';

export default {

  namespace: 'user',

  state: {
    adminInfo: {
      username: ''
    }
  },

  subscriptions: {
    setup({ dispatch, history }) { 
      if(window.location.pathname !== '/login') {
        dispatch({
          type: 'fetchAdminInfo'
        });
      }
      
    },
  },

  effects: {
    *login({ payload }, { call, put }) { 
      const { data } = yield call(userServeices.login, payload);

      if(data && data.code === 200) {
        message.success(data.msg);
        window.localStorage.setItem('token', data.data.token);
        window.location = '/manageGoods';
      } else {
        message.error(data.msg);
      }

      return data.code;
    },
    *logout({ payload }, { call, put }) { 
      const { data } = yield call(userServeices.logout, payload);

      if(data && data.code === 200) {
        message.success(data.msg);
        window.localStorage.setItem('token', '');
        window.location = '/login';
      } else {
        message.error(data.msg);
      }

      return data.code;
    },
    *fetchAdminInfo({ payload }, { call, put }) { 
      const { data } = yield call(userServeices.fetchAdminInfo, payload);
    
      if(data && data.code === 200) {
        yield put({
          type: 'save',
          payload: {
            adminInfo: data.data
          }
        })
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