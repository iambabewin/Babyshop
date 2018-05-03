import { message } from 'antd';
import * as services from './services';

export function *fetch({ payload }, { call, put }) {
  try {
    
    const {data} = yield call(services.fetch, payload);

    if (data && data.code === 200) {
      yield put({ 
        type: 'save',
        payload: { [payload.name]: data.data } 
      });
    } else {
      message.error(data.msg);
    }

    return data.data;
  } catch (error) {
    message.error('获取失败');
  }
}

export function *operate({ payload }, { call, put }) {
  try {
    
    const {data} = yield call(services.fetch, payload);

    if (data && data.code === 200) {
      message.success(data.msg);
    } else {
      message.error(data.msg);
    }

    return data.data;
  } catch (error) {
    message.error('操作失败');
  }
}