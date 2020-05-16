"use strict";

const questionRepository = require("../repositories/QuestionRepository");
const studentRepository = require("../repositories/StudentRepository");

module.exports.create = async (question) => {
    question = await questionRepository.create(question);
    return "Question is created";
};

module.exports.assign = async (studentId, questionId) => {
    const student = await studentRepository.findOne({id: studentId});
    const question = await questionRepository.findActiveOne({id: questionId});

    await questionRepository.assignQuestion(question, student);

    return "Question is assigned to student";
};

module.exports.assigned = async (student) => {
    return await questionRepository.assignedQuestions(student);
};
