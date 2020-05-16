"use strict";

const StudentService = require("../services/StudentService");

module.exports.register = async (req, res, next) => {
    try {
        res.body = await StudentService.register(req.body)
        next()
    } catch (e) {
        next(e);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        res.body = await StudentService.login(req.body)
        next()
    } catch (e) {
        next(e);
    }
};
