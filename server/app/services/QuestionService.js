"use strict";

const questionRepository = require("../repositories/QuestionRepository");
const studentRepository = require("../repositories/StudentRepository");

module.exports.get = async () => {
    return await questionRepository.findWithDetails({});
};

module.exports.getStudents = async (questionId) => {
    const question = await questionRepository.findOne({id: questionId});
    return await questionRepository.getStudents(question);
};

module.exports.create = async (question) => {
    question = await questionRepository.create(question);
    return "Question is created";
};

module.exports.assign = async (studentId, questionId) => {
    const student = await studentRepository.findOne({id: studentId});
    const question = await questionRepository.findActiveOne(questionId);

    await questionRepository.assignQuestion(question, student);

    return "Question is assigned to student";
};


module.exports.unassign = async (studentId, questionId) => {
    const student = await studentRepository.findOne({id: studentId});
    const question = await questionRepository.findOne({id: questionId});

    await questionRepository.unassignQuestion(question, student);

    return "Question is unassigned to student";
};

module.exports.assigned = async (student) => {
    return await questionRepository.assignedQuestions(student);
};
