import { LOGIN } from '../constants/actionTypes';
import initialState from './initialState';
import reducersGenerate from './reducersGenerate';

export default reducersGenerate(LOGIN, initialState.lectures, {
  'GET_LECTURE_PENDING': (state) => {
    return Object.assign({}, state, {
      list: [],
      isFetching: true
    });
  },
  'GET_LECTURE_FULFILLED': (state, action) => {
    console.log(action);
    return Object.assign({}, state, {
      list: action.payload.result,
      isFetching: false
    });
  },
  'GET_LECTURE_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      list: [],
      isFetching: false
    });
  }
});
