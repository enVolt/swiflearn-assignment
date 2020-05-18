import reducersGenerate from './reducersGenerate';

export default reducersGenerate("UNATTENDED_STUDENT_QUESTION", {
  list: [],
  isFetching: false
}, {
  'UNATTENDED_STUDENT_QUESTION_PENDING': (state) => {
    return Object.assign({}, state, {
      list: [],
      isFetching: true
    });
  },
  'UNATTENDED_STUDENT_QUESTION_FULFILLED': (state, action) => {
    console.log(action);
    return Object.assign({}, state, {
      list: action.payload.result,
      isFetching: false
    });
  },
  'UNATTENDED_STUDENT_QUESTION_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      list: [],
      isFetching: false
    });
  }
});
