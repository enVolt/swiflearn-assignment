import cFetch from './../utils/cFetch';
import { LOGIN, REGISTER, GET_ME } from './../constants/actionTypes';
import { API_CONFIG } from './../config/api';

export const loginUser = (creds, cbk) => {
  return {
    type: LOGIN,
    fallback: cbk,
    payload: cFetch("students/login", { method: "POST", body: JSON.stringify(creds) }).then(response => {
      localStorage.setItem('auth_token', response.result.token);
      location.href = "/";
    })
  };
};

export const getMe = () => {
  return {
    type: GET_ME,
    payload: cFetch("students/me", { method: "GET" })
  };
};

export const registerUser = (request, cbk) => {
  return {
    type: REGISTER,
    fallback: cbk,
    payload: cFetch("students/register", { method: "POST", body: JSON.stringify(request) }).then(response => {
      localStorage.setItem('auth_token', response.result.token);
      location.href = "/";

      return response;
    })
  };
};
