import cFetch from '../utils/cFetch';
import { GET_LECTURE, CREATE_LECTURE } from '../constants/actionTypes';

export const getAllStudents = () => {
  return {
    type: "GET_STUDENTS",
    payload: cFetch("students/all", { method: "GET" })
  };
};
