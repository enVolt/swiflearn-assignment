"use strict";

const EError = require("./EError");
const Joi = require("joi");

const { GRADE, EXAM_BOARD } = require("../app/constants");

const schemas = {
    studentRegister: {
        body: Joi.object().keys({
            email: Joi.string().email().required(),
            name: Joi.string().required(),
            dateOfBirth: Joi.date().required().max('now'),
            grade: Joi.string().valid(Object.values(GRADE)).required(),
            board: Joi.string().valid(Object.values(EXAM_BOARD)),
            password: Joi.string().required(),
            mobile: Joi.string().required()
        })
    },
    studentLogin: {
        body: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    },
    questionCreate: {
        body: Joi.object().keys({
            question: Joi.string().required(),
            description: Joi.string().required(),
            subjectId: Joi.number().required()
        })
    },
    questionAssign: {
        query: Joi.object().keys({
            questionId: Joi.number().positive().required(),
            studentId: Joi.number().positive().required()
        })
    },
    questionAnswer: {
        body: Joi.object().keys({
            answer: Joi.string().required()
        })
    },
    lectureCreate: {
        body: Joi.object().keys({
            description: Joi.string().required(),
            start: Joi.date().min('now').required(),
            end: Joi.date().min('now').required(),
            subjectId: Joi.number().required(),
            teacherId: Joi.number().required()
        })
    },
    lectureAssign: {
        query: Joi.object().keys({
            lectureId: Joi.number().positive().required(),
            studentId: Joi.number().positive().required()
        })
    }
};

module.exports.validate = (schema, body) => {
    if (!schema || !schemas[schema]) throw new EError("Invalid Schema", 400);

    const validationResult = Joi.validate(body, schemas[schema], {allowUnknown: true});
    if (validationResult.error) {
        return Promise.reject(new EError("Invalid Schema", 400, validationResult.error.details.map(err => err.message)));
    }
    return Promise.resolve();
};

module.exports.validateRequest = (schema) => {
    if (!schema || !schemas[schema]) throw new EError("Invalid Schema", 400);

    return (req, res, next) => {
        const validationResult = Joi.validate(req, schemas[schema], {allowUnknown: true});
        if (validationResult.error) {
            return next(new EError("Invalid Schema", 400, validationResult.error.details.map(err => err.message)));
        }
        return next();
    };
};