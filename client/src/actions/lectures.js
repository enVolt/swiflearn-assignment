import cFetch from './../utils/cFetch';
import { GET_LECTURE, CREATE_LECTURE } from './../constants/actionTypes';

export const getLectures = () => {
  return {
    type: GET_LECTURE,
    payload: cFetch("lectures", { method: "GET" })
  };
};

export const createLecture = (lecture) => {
  return {
    type: CREATE_LECTURE,
    payload: cFetch("lectures", { method: "POST", body: JSON.stringify(lecture) })
  };
};

export const getStudents = (lectureId) => {
    return {
        type: "GET_STUDENT_OF_LECTURE",
        payload: cFetch("lectures/" + lectureId + "/students")
    }
}

export const assignStudent = (lectureId, studentId) => {
    return {
        type: "ASSIGN_STUDENT_LECTURE",
        payload: cFetch("lectures/assign", {method: "PUT", query: {lectureId, studentId}})
    }
}

export const unassignStudent = (lectureId, studentId) => {
    return {
        type: "UNASSIGN_STUDENT_LECTURE",
        payload: cFetch("lectures/unassign", {method: "PUT", query: {lectureId, studentId}})
    }
}

export const upcomingLectures = () => {
    return {
        type: "UPCOMING_STUDENT_LECTURE",
        payload: cFetch("lectures/assigned", {method: "GET"})
    }
}