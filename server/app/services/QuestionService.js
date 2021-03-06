"use strict";

const questionRepository = require("../repositories/QuestionRepository");
const studentRepository = require("../repositories/StudentRepository");

const EError = require("../../helpers/EError");

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

module.exports.answer = async (questionId, answer, student) => {
    const question = await questionRepository.findOne(questionId)
    const questionStudent = await questionRepository.findQuestionStudent(question, student);

    if (questionStudent.isAnswered) {
        throw new EError("Question is already answered", 400);
    }

    questionStudent.set("answer", answer);
    await question.save();
    return "Answer is saved";
};

module.exports.assigned = async (student) => {
    return await questionRepository.assignedQuestions(student);
};
