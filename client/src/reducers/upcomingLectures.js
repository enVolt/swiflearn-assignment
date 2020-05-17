import reducersGenerate from './reducersGenerate';

export default reducersGenerate("UPCOMING_STUDENT_LECTURE", {
  list: [],
  isFetching: false
}, {
  'UPCOMING_STUDENT_LECTURE_PENDING': (state) => {
    return Object.assign({}, state, {
      list: [],
      isFetching: true
    });
  },
  'UPCOMING_STUDENT_LECTURE_FULFILLED': (state, action) => {
    console.log(action);
    return Object.assign({}, state, {
      list: action.payload.result,
      isFetching: false
    });
  },
  'UPCOMING_STUDENT_LECTURE_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      list: [],
      isFetching: false
    });
  }
});
