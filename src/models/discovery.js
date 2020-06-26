import request from '../util/request';
export default {
    namespace: 'discovery',
    state: {
        discovery_list: [],
        // statistic: {},
    },
    effects: {
        *queryList({ _ }, { call, put }) {
            const endPointURI = 'http://127.0.0.1:5000/product_discovery_lists'
            const rsp = yield call(request, endPointURI);
            // console.log('queryList');
            // console.log(rsp, 'rsp result---');
            yield put({ type: 'saveList', payload: { discovery_list: rsp } });
        },
        // *addcard({}, {call, put}){
        //     const endPointURI = '/dev/random_card_add'
        //     const rsp = yield call(request, endPointURI);
        //     yield put({type: 'saveList', payload: {cards: rsp.single}})
        // }
    },
    reducers: {
        saveList(state, {payload: {discovery_list}}){
            console.log(discovery_list)
            return {
                ...state,
                discovery_list
            }
        },
        // addNewCard(state, {payload: newCard}){
        //     const nextCounter = state.counter + 1;
        //     const newCardWithId = {...newCard, id: nextCounter};
        //     const nextData = state.data.concat(newCardWithId);
        //     console.log(nextData,"...reducer card")
        //     return {
        //         cardsList: nextData
        //     }
        // }
    }
};
