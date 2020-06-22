import request from '../util/request';
export default {
    namespace: 'puzzlecards',
    state: {
        data: [],
        counter: 0
    },
    effects: {
        *queryInitCards(_, sagaEffects){
            const {call, put} = sagaEffects;
            const endPointURI = '/dev/random_joke'
            const puzzle = yield call(request, endPointURI)
            yield put({type: 'addNewCard', payload: puzzle})
        }
    },
    reducers: {
        addNewCard(state, {payload: newCard}){
            const nextCounter = state.counter + 1;
            const newCardWithId = {...newCard, id: nextCounter};
            const nextData = state.data.concat(newCardWithId);
            return {
                data: nextData,
                counter: nextCounter,
            }
        }
    }
};
