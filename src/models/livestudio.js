import request from "../util/request";
import * as lsService from "../service/livestudio_service";
export default {
  namespace: "livestudio",
  state: {
    livestudio_list: [],
    editingKey: "",
  },

  effects: {
    *queryList({ _ }, { call, put }) {
      const rsp = yield call(lsService.queryList);
      yield put({ type: "saveList", payload: { livestudio_list: rsp } });
    },
    *search({ ...payload }, { call, put }) {
      const studio_id = payload.payload;
      //   console.log("我在model里，我被请求了------");
      console.log("我在model里，我拿到的form为", studio_id);
      const rsp = yield call(lsService.search, studio_id);
      console.log(rsp);
      //   console.log("当前的数据类型为数组吗？----", rsp instanceof Array);
      yield put({ type: "searchReducer", payload: { livestudio_single: rsp } });
    },
  },
  reducers: {
    saveList(state, { payload: { livestudio_list } }) {
      console.log(livestudio_list);
      return {
        ...state,
        livestudio_list,
      };
    },
    searchReducer(state, { payload: { livestudio_single } }) {
      //   console.log("我是reducer，我要看看state", state, discovery_single);
      state.livestudio_list = livestudio_single;
      return {
        ...state,
      };
    },
  },
};
