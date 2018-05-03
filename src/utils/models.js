import { message } from 'antd';

export default function createModels(model) {
  const createEffects = (effect)=> {
    if(typeof effect === 'object') {
      return function *({ payload }, { call, put }) { 
        const { data } = yield call(effect.service, payload);

        if(data && data.code === 200) {
          effect.save && (
            yield put({
              type: 'save',
              payload: {
                [effect.save]: data.data || data.info,
              }
            })
          );
          message.success(data.msg);
        } else if(data && data.code !== 200) {
          message.error(data.msg);
        } else {
          message.error('请求出错，请检查网络是否正常。');
        }

        return data.code;
      }
    } else {
      return effect;
    }
  };
  
  const effects = {};
  const reducers = Object.assign(
    {}, 
    {
      save: function(state, action) {
        console.log(action);
        return { ...state, ...action.payload };
      },
    }, 
    model.reducers
  );

  Object.entries(model.effects).map(([key, effect])=> {
    effects[key] = createEffects(effect);
  });

  return {
    ...model,
    effects,
    reducers,
  };
}