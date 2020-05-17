import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import user from './user';
import me from './me';
import lecturesCreate from './lecturesCreate';
import lecturesGet from './lecturesGet';
import lectureStudent from './lectureStudent';
import students from './students';
import upcomingLectures from './upcomingLectures';

import reducersGenerate from './reducersGenerate';

import {
  USER
} from './../constants/actionTypes';
import initialState from './initialState';

const users = reducersGenerate(USER, initialState.users);

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  users,
  user,
  me,
  lecturesGet, lecturesCreate, lectureStudent,
  students,
  upcomingLectures
  
});

export default rootReducer;
