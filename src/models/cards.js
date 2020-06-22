import request from '../util/request';
import cards from "../../mock/cards";
export default {
    namespace: 'cards',
    state: {
        cardsList: [],
        counter: 0,
        // statistic: {},
    },
    effects: {
        *queryList({ _ }, { call, put }) {
            const endPointURI = '/dev/random_card'
            const rsp = yield call(request, endPointURI);
            console.log('queryList');
            console.log(rsp);
            yield put({ type: 'saveList', payload: { cardsList: rsp.result } });
        },
        // *queryList(_, sagaEffects){
        //     const {call, put} = sagaEffects;
        //     const endPointURI = '/dev/random_card'
        //     const card = yield call(request, endPointURI)
        //     console.log(card,"model card...")
        //     yield put({type: 'saveList', payload: {cardsList: card}})
        // }
    },
    reducers: {
        saveList(state, {payload: {cardsList}}){
            console.log(cardsList)
            return (
                cardsList
            )
        },
        addNewCard(state, {payload: newCard}){
            const nextCounter = state.counter + 1;
            const newCardWithId = {...newCard, id: nextCounter};
            const nextData = state.data.concat(newCardWithId);
            console.log(nextData,"...reducer card")
            return {
                cardsList: nextData
            }
        }
    }
};
