import request from "../util/request";
import * as sdService from "../service/product_item_service";
export default {
  namespace: "student_qr_code",
  state: {
    student_qr_code_list: [],
    editingKey: "",
    // statistic: {},
  },
  effects: {
    *queryList({ _ }, { call, put }) {
      // const endPointURI = "http://127.0.0.1:5000/student_qr_code_list";
      const rsp = yield call(sdService.queryList);
      yield put({ type: "saveList", payload: { student_qr_code_list: rsp } });
    },
    *save({ ...payload }, { call, put }) {
      const { id, form } = payload.payload;
      const row = form.getFieldsValue();
      const rsp = yield call(sdService.update, id, row);
      const rsp2 = yield call(sdService.queryList);
      yield put({ type: "saveList", payload: { student_qr_code_list: rsp2 } });
    },
    *search({ ...payload }, { call, put }) {
      const item_no = payload.payload;
      const rsp = yield call(sdService.search, item_no);
      console.log(rsp);
      yield put({
        type: "searchReducer",
        payload: { student_qr_code_single: rsp },
      });
    },
  },
  reducers: {
    saveList(state, { payload: { student_qr_code_list } }) {
      console.log(student_qr_code_list);
      return {
        ...state,
        student_qr_code_list,
      };
    },
    searchReducer(state, { payload: { student_qr_code_single } }) {
      //   console.log("我是reducer，我要看看state", state, discovery_single);
      state.student_qr_code_list = student_qr_code_single;
      return {
        ...state,
      };
      // addNewCard(state, {payload: newCard}){
      //     const nextCounter = state.counter + 1;
      //     const newCardWithId = {...newCard, id: nextCounter};
      //     const nextData = state.data.concat(newCardWithId);
      //     console.log(nextData,"...reducer card")
      //     return {
      //         cardsList: nextData
      //     }
      // }
    },
  },
};
