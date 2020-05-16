"use strict";

const { Question, StudentQuestion } = require("../models");
const { QUESTION_STATUS } = require("../constants");
const BaseRepository = require("./BaseRepository");

class QuestionRepository extends BaseRepository {
    constructor () {
        super(Question);
    }

    async findActiveOne (questionId) {
        return await this.findOne({
            id: questionId,
            status: QUESTION_STATUS.ACTIVE
        });
    }

    async assignQuestion (question, student) {
        return await StudentQuestion.create({
            question,
            student
        });
    }

    async assignedQuestions (student) {
        return await StudentQuestion.findAll({
            student,
            isAnswered: false,
            include: [ Question ]
        });
    }
};

module.exports = new QuestionRepository();