"use strict";

const EError = require("./EError");
const Joi = require("joi");

// const userNameRegex = /^[a-zA-Z -_.]*$/;

const emailEventSchema = {
    receiverEmail: Joi.string().required(),
    receiverEmailList: Joi.array().items(Joi.string().email()).allow(null),
    emailData: Joi.object().required(),
    emailType: Joi.string().required(),
    fromName: Joi.string().required(),
    ccEmailList: Joi.array().items(Joi.string().email()).allow(null),
    bccEmailList: Joi.array().items(Joi.string().email()).allow(null),
    additionalReplyEmailList: Joi.array().items(Joi.string().email()).allow(null)
};

const schemas = {
    IdParamRequest: {
        params: Joi.object().keys({
            id: Joi.number().required()
        })
    },
    emailEventSchema: emailEventSchema,
    emailRenderRequest: {
        body: {
            emailData: Joi.object().required(),
            emailType: Joi.string().required()
        }
    },
    createCampaignRequest: {
        body: {
            campaignId: Joi.string().required(),
            userId: Joi.number().allow(null),
            totalRecipients: Joi.number().required()
        }
    },
    createCampaignGroupRequest: {
        body: {
            identifier: Joi.string().required(),
            type: Joi.string().required()
        }
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