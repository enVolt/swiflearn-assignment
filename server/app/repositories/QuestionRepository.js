"use strict";

const { Question, StudentQuestion, Subject } = require("../models");
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
            questionId: question.id,
            studentId: student.id
        });
    }

    async unassignQuestion (question, student) {
        return await StudentQuestion.destroy({
            where: {
                studentId: student.id,
                questionId: question.id
            }
        });
    }

    async assignedQuestions (student) {
        return await StudentQuestion.findAll({
            where: {
                studentId: student.id,
                isAnswered: false
            },
            include: [ {
                model: Question,
                include: [ Subject ]
            } ]
        });
    }
  
    async getStudents (question) {
        return await StudentQuestion.findAll({
            where: {
                questionId: question.id
            }
        });
    }

    async findWithDetails (condition) {
        return await Question.findAll({where: condition, include: [ Subject ]})
    }
};

module.exports = new QuestionRepository();