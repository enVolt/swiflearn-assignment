import reducersGenerate from './reducersGenerate';

export default reducersGenerate("GET_STUDENT_OF_LECTURE", {
  list: [],
  isFetching: false
}, {
  'GET_STUDENT_OF_LECTURE_PENDING': (state) => {
    return Object.assign({}, state, {
      list: [],
      isFetching: true
    });
  },
  'GET_STUDENT_OF_LECTURE_FULFILLED': (state, action) => {
    console.log(action);
    return Object.assign({}, state, {
      list: action.payload.result,
      isFetching: false
    });
  },
  'GET_STUDENT_OF_LECTURE_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      list: [],
      isFetching: false
    });
  }
});
