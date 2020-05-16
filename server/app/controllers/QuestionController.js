"use strict";

const QuestionService = require("../services/QuestionService");

module.exports.create = async (req, res, next) => {
    try {
        res.body = await QuestionService.create(req.body)
        next()
    } catch (e) {
        next(e);
    }
};

module.exports.assigned = async (req, res, next) => {
    try {
        res.body = await QuestionService.assigned(req.student)
        next();
    } catch (e) {
        next(e);
    }
};

module.exports.assign = async (req, res, next) => {
    try {
        res.body = await QuestionService.assign(req.query.studentId, req.query.questionId);
        next();
    } catch (e) {
        next(e);
    }
};
