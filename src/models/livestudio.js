import request from "../util/request";
import * as lsService from "../service/livestudio_service";
export default {
  namespace: "livestudio",
  state: {
    livestudio_list: [],
    editingKey: "",
    basestudio_list: [],
  },

  effects: {
    *queryList({ _ }, { call, put }) {
      const rsp = yield call(lsService.queryList);
      const rsp2 = yield call(lsService.queryBaseInfoList);
      yield put({
        type: "saveList",
        payload: { livestudio_list: rsp, basestudio_list: rsp2 },
      });
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
      // const switchType = [
      //   "live_show_voucher",
      //   "live_auto_popup",
      //   "live_minimize",
      //   "live_singleday_rank_show",
      //   "replay_show_atmosphere",
      //   "replay_show_coupon",
      //   "replay_show_deposit",
      //   "replay_show_product",
      // ];
      // switchType.forEach((item) => {
      //   if ((initform[item] == false) | (initform[item] == true)) {
      //     initform[item] = initform[item] ? 1 : 0;
      //   } else if (initform[item] == null) {
      //     initform[item] = 0;
      //   }
      // });
      const rsp = yield call(lsService.update, studio_id, initform);
      console.log("我修改成功了吗？返回的结果", rsp);
      const rsp2 = yield call(lsService.queryList);
      console.log("回显重新刷新的值", rsp2);
      yield put({ type: "saveList", payload: { livestudio_list: rsp2 } });
    },
    *addOne({ ...payload }, { call, put }) {
      const { form } = payload.payload;
      console.log(
        "我是新增内容，我在model里，我要看看你给我的参数是什么",
        form
      );
      const rsp = yield call(lsService.addOne, form);
      console.log("我修改成功了吗？返回的结果", rsp);
      const rsp2 = yield call(lsService.queryList);
      yield put({ type: "saveList", payload: { livestudio_list: rsp2 } });
    },
  },
  reducers: {
    saveList(state, { payload: { livestudio_list, ...params } }) {
      // console.log(livestudio_list);
      const return_livestudio_list = livestudio_list;
      const switchType = ["live_type", "replay_type"];
      console.log("输出下，我这个值的变化", livestudio_list);
      return_livestudio_list.forEach((item) => {
        switchType.forEach((item2) => {
          // console.log("item1: ", item, "item2: ...", item2);
          // console.log(item[item2]);
          if (item[item2] != null) {
            item[item2] = item[item2].toString();
          }
        });
      });
      // if (return_livestudio_list.length > 0) {
      //   return_livestudio_list.forEach((item) => {
      //     switchType.forEach((item2) => {
      //       item[item2].toString();
      //     });
      //   });
      // }
      // livestudio_list[3]["live_type"] = livestudio_list[3][
      //   "live_type"
      // ].toString();
      console.log("reducer里====", typeof livestudio_list[4]["live_type"]);
      return {
        ...state,
        livestudio_list,
        ...params,
      };
    },
    searchReducer(state, { payload: { livestudio_single } }) {
      //   console.log("我是reducer，我要看看state", state, discovery_single);
      state.livestudio_list = return_livestudio_list;
      return {
        ...state,
      };
    },
  },
};
