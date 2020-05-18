import cFetch from './../utils/cFetch';

export const getQuestions = () => {
  return {
    type: "GET_QUESTIONS",
    payload: cFetch("questions", { method: "GET" })
  };
};

export const getStudents = (questionId) => {
    return {
        type: "GET_STUDENT_OF_QUESTION",
        payload: cFetch("questions/" + questionId + "/students")
    }
}

export const assignStudent = (questionId, studentId) => {
    return {
        type: "ASSIGN_STUDENT_QUESTION",
        payload: cFetch("questions/assign", {method: "PUT", query: {questionId, studentId}})
    }
}

export const unassignStudent = (questionId, studentId) => {
    return {
        type: "UNASSIGN_STUDENT_QUESTION",
        payload: cFetch("questions/unassign", {method: "PUT", query: {questionId, studentId}})
    }
}

export const unattendedQuestions = () => {
    return {
        type: "UNATTENDED_STUDENT_QUESTION",
        payload: cFetch("questions/assigned", {method: "GET"})
    }
}