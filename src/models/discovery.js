import request from '../util/request';
import * as dsService  from '../service/discovery_service'
export default {
    namespace: 'discovery',
    state: {
        discovery_list: [],
        editingKey: ''
    },
    effects: {
        *queryList({ _ }, { call, put }) {
            // const endPointURI = 'http://127.0.0.1:5000/product_discovery_lists'
            const rsp = yield call(dsService.queryList);
            // console.log('queryList');
            // console.log(rsp, 'rsp result---');
            yield put({ type: 'saveList', payload: { discovery_list: rsp } });
        },
        *save({...payload}, {call, put}){
            // const endPointURI = `http://127.0.0.1:5000/product_discovery_single/${id}`
            const {id, form} = payload.payload
            const row = form.getFieldsValue();
            const rsp = yield call(dsService.update, id, row);
            yield put({type: 'update', payload: {discovery_single: rsp}})
        },
        *search({...payload}, {call, put}){
            const item_no = payload.payload
            console.log("我在model里，我被请求了------")
            console.log("我在model里，我拿到的form为", item_no)
            const rsp = yield call(dsService.search, item_no);
            console.log(rsp)
            console.log("当前的数据类型为数组吗？----", rsp instanceof Array)
            yield put({type: 'search', payload: {discovery_single: rsp}})
        }
    },
    reducers: {
        saveList(state, {payload: {discovery_list}}){
            console.log(discovery_list);
            return {
                ...state,
                discovery_list
            }
        },
        update(state, {payload: {discovery_single}}){
            // console.log("我是reducer，打印下state的状态====", state)
            const new_discovery_list = state.discovery_list
            // console.log(new_discovery_list)
            // console.log(discovery_single);
            let index = new_discovery_list.findIndex((item) => discovery_single.id === item.key)
            discovery_single = new_discovery_list[index]
            return {
                editingKey: '',
                discovery_list: new_discovery_list
            }
        },
        search(state, {payload: {discovery_single}}){
            // const new_discovery_list = []
            // new_discovery_list.push(discovery_single)
            // discovery_single = new_discovery_list[index]
            return {
                editingKey: '',
                discovery_list: discovery_single
            }
        }

    }
};
