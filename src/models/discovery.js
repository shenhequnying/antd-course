import request from "../util/request";
import * as dsService from "../service/discovery_service";
export default {
  namespace: "discovery",
  state: {
    discovery_list: [],
    editingKey: "",
  },
  effects: {
    *queryList({ _ }, { call, put }) {
      const rsp = yield call(dsService.queryList);
      yield put({ type: "saveList", payload: { discovery_list: rsp } });
    },
    *save({ ...payload }, { call, put }) {
      const { id, form } = payload.payload;
      const row = form.getFieldsValue();
      const rsp = yield call(dsService.update, id, row);
      const rsp2 = yield call(dsService.queryList);
      yield put({ type: "saveList", payload: { discovery_list: rsp2 } });
      //   yield put({ type: "update", payload: { discovery_single: rsp } });
    },
    *search({ ...payload }, { call, put }) {
      const item_no = payload.payload;
      //   console.log("我在model里，我被请求了------");
      //   console.log("我在model里，我拿到的form为", item_no);
      const rsp = yield call(dsService.search, item_no);
      console.log(rsp);
      //   console.log("当前的数据类型为数组吗？----", rsp instanceof Array);
      yield put({ type: "searchReducer", payload: { discovery_single: rsp } });
    },
    *addOne({ ...payload }, { call, put }) {
      const { form } = payload.payload;
      //   const row = form.getFieldsValue();
      //   const row = form.getFieldsValue();
      console.log(
        "我是新增内容，我在model里，我要看看你给我的参数是什么",
        form
      );
      const rsp = yield call(dsService.addOne, form);
      console.log("post 接口添加状态", rsp);
      const rsp2 = yield call(dsService.queryList);
      yield put({ type: "searchReducer", payload: { discovery_single: rsp2 } });
    },
  },
  reducers: {
    saveList(state, { payload: { discovery_list } }) {
      console.log(discovery_list);
      return {
        ...state,
        discovery_list,
      };
    },
    searchReducer(state, { payload: { discovery_single } }) {
      //   console.log("我是reducer，我要看看state", state, discovery_single);
      state.discovery_list = discovery_single;
      return {
        ...state,
      };
    },
  },
};
