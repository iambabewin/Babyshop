import * as category from '../services/category';
import { message } from 'antd';

export default {

  namespace: 'category',

  state: {
    categoryList: {
      list: []
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    /**
     * 添加分类
     */
    *AddCategory({ payload }, { call, put }) {
      const { data } = yield call(category.AddCategory, payload);
      // console.log(data)
      if (data && data.code === 200) {
        message.success(data.msg);
        return data.code;
      } else {
        message.error(data.msg || '添加分类失败')
      }
    },

    *DelCategory({ payload }, { call, put }) {
      const { data } = yield call(category.DelCategory, payload);
      // console.log(data)
      if (data && data.code === 200) {
        message.success(data.msg);
        return data.code;
      } else {
        message.error(data.msg || '删除分类失败')
      }
    },


    /**
     * 获取所有分类
     */
    *GetCategory({ payload }, { call, put }) {
      try {
        const { data } = yield call(category.GetCategory, payload);
        if (data && data.code === 200) {
          yield put({
            type: 'save',
            payload: { categoryList: data.data }
          });
          return data.data;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },
    /**
    * 更新分类
    */
    *EditCategory({ payload }, { call, put }) {
      const { data } = yield call(category.EditCategory, payload);
      if (data && data.code === 200) {
        message.success(data.msg);
        return data.code;
      } else {
        message.error(data.msg || '更新分类失败')
      }
    },

  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
