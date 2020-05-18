"use strict";

const QuestionService = require("../services/QuestionService");

module.exports.get = async (req, res, next) => {
    try {
        res.body = await QuestionService.get()
        next()
    } catch (e) {
        next(e);
    }
};

module.exports.getStudents = async (req, res, next) => {
    try {
        res.body = await QuestionService.getStudents(req.params.id)
        next()
    } catch (e) {
        next(e);
    }
};

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

module.exports.unassign = async (req, res, next) => {
    try {
        res.body = await QuestionService.unassign(req.query.studentId, req.query.questionId);
        next();
    } catch (e) {
        next(e);
    }
};

module.exports.answer = async (req, res, next) => {
    try {
        res.body = await QuestionService.answer(req.params.questionId, req.body.answer, req.student);
        next();
    } catch (e) {
        next(e);
    }
};
