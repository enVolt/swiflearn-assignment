"use strict";

const LectureService = require("../services/LectureService");

module.exports.create = async (req, res, next) => {
    try {
        res.body = await LectureService.create(req.body)
        next()
    } catch (e) {
        next(e);
    }
};

module.exports.assigned = async (req, res, next) => {
    try {
        res.body = await LectureService.assigned(req.student)
        next();
    } catch (e) {
        next(e);
    }
};

module.exports.assign = async (req, res, next) => {
    try {
        res.body = await LectureService.assign(req.query.studentId, req.query.lectureId);
        next();
    } catch (e) {
        next(e);
    }
};
