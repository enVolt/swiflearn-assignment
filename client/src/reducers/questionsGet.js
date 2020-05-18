import initialState from './initialState';
import reducersGenerate from './reducersGenerate';

export default reducersGenerate("GET_QUESTIONS", {
  list: [],
  isFetching: false
}, {
  'GET_QUESTIONS_PENDING': (state) => {
    return Object.assign({}, state, {
      list: [],
      isFetching: true
    });
  },
  'GET_QUESTIONS_FULFILLED': (state, action) => {
    console.log(action);
    return Object.assign({}, state, {
      list: action.payload.result,
      isFetching: false
    });
  },
  'GET_QUESTIONS_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      list: [],
      isFetching: false
    });
  }
});
