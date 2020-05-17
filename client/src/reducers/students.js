import reducersGenerate from './reducersGenerate';

export default reducersGenerate("GET_STUDENT", {
  list: [],
  isFetching: false
}, {
  'GET_STUDENTS_PENDING': (state) => {
    return Object.assign({}, state, {
      list: [],
      isFetching: true
    });
  },
  'GET_STUDENTS_FULFILLED': (state, action) => {
    return Object.assign({}, state, {
      list: action.payload.result,
      isFetching: false
    });
  },
  'GET_STUDENTS_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      list: [],
      isFetching: false
    });
  }
});
