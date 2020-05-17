import { REGISTER } from './../constants/actionTypes';
import initialState from './initialState';
import reducersGenerate from './reducersGenerate';

export default reducersGenerate(REGISTER, initialState.auth, {
    'REGISTER_PENDING': (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        name: null,
        email: null
      });
    },
    'REGISTER_FULFILLED': (state, action) => {
      return Object.assign({}, state, {
        isFetching: false,
        name: action.name,
        email: action.email
      });
    },
    'REGISTER_REJECTED': (state, action) => {
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.payload.message,
        name: null,
        email: null
      });
    }
  });
  