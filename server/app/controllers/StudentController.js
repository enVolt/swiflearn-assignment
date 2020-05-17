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

module.exports.me = async (req, res, next) => {
    try {
        res.body = {
            email: req.student.email,
            name: req.student.name
        }
        next()
    } catch (e) {
        next(e);
    }
};
