import { LOGIN } from '../constants/actionTypes';
import initialState from './initialState';
import reducersGenerate from './reducersGenerate';

export default reducersGenerate(LOGIN, initialState.auth, {
  'GET_ME_PENDING': (state) => {
    return Object.assign({}, state, {
      isFetching: true,
      isAuthenticated: false,
      name: null,
      email: null
    });
  },
  'GET_ME_FULFILLED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: true,
      name: action.payload.name,
      email: action.payload.email
    });
  },
  'GET_ME_REJECTED': (state, action) => {
    localStorage.removeItem("auth_token");
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      errorMessage: action.message,
      name: null,
      email: null
    });
  }
});
