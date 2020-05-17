import { LOGIN } from '../constants/actionTypes';
import initialState from './initialState';
import reducersGenerate from './reducersGenerate';

export default reducersGenerate(LOGIN, initialState.lectures, {
  'CREATE_LECTURES_PENDING': (state) => {
    return Object.assign({}, state, {
      list: [],
      isFetching: true
    });
  },
  'CREATE_LECTURES_FULFILLED': (state, action) => {
    return Object.assign({}, state, {
      list: action.payload.result,
      isFetching: false
    });
  },
  'CREATE_LECTURES_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      list: [],
      isFetching: false
    });
  }
});
