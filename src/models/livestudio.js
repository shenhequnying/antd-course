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
    *save({ ...payload }, { call, put }) {
      let initform = payload.payload.form.getFieldsValue();
      let studio_id = payload.payload.id;
      const switchType = [
        "live_show_voucher",
        "live_auto_popup",
        "live_minimize",
        "live_singleday_rank_show",
        "replay_show_atmosphere",
        "replay_show_coupon",
        "replay_show_deposit",
        "replay_show_product",
      ];
      switchType.forEach((item) => {
        if ((initform[item] == false) | (initform[item] == true)) {
          initform[item] = initform[item] ? 1 : 0;
        } else if (initform[item] == null) {
          initform[item] = 0;
        }
        // initform;
      });
      // console.log("输出下，我获取到的值====", payload);
      // console.log(
      //   "输出下我获取到的form信息： id, form, initform",
      //   payload.payload.id,
      //   payload.payload.form.getFieldsValue(),
      //   initform
      // );
      const rsp = yield call(lsService.update, studio_id, initform);
      console.log("我修改成功了吗？返回的结果", rsp);
      const rsp2 = yield call(lsService.queryList);
      console.log("回显重新刷新的值", rsp2);
      yield put({ type: "saveList", payload: { livestudio_list: rsp2 } });
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
