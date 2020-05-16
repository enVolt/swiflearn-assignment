"use strict";

const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid/v4");
const bcrypt = require("bcrypt");

const { jwtSecret, salt} = require("../app/config").password;
const { Session } = require("../app/models");
const { SESSION_STATUS } = require("../app/constants");
const EError = require("./EError");

const SALT_ROUND = 10;

/**
 * @param {String} sessionId
 * @param {User} user
 */
module.exports.persistStudentLogin = async (student) => {
    const sessionId = uuidv4();
    const userType = this.USER_TYPE.STUDENT;

    const token = jwt.sign({
        sessionId,
        userType
    }, jwtSecret, {
        audience: userType
    });

    await Session.create({
        uuid: sessionId,
        token,
        student
    });
    return token;
};

module.exports.securePassword = async (password) => {
    return await bcrypt.hash(`${password}--${salt}`, SALT_ROUND);
};

module.exports.validatePassword = async (password, hash) => {
    return await bcrypt.compare(`${password}--${salt}`, hash);
};

module.exports.authenticate = (audience) => {
    return async (req, res, next) => {
        if (audience === this.USER_TYPE.ADMIN) {
            // TODO: Implement authetication strategy for Admin
            return next();
        }

        if (audience != this.USER_TYPE.STUDENT) {
            throw new Error("invalid type of user");
        }
        
        /**
         * 1. Validate Cookie Session Id
         * 2. Validate JWT Token
         * 3. Compare JWT Token's Session Id with Cookie Session Id
         * 4. Get cached User Data from Redis for Session Id and compare with JWT Token's User Id
         */
        if (!req.headers['x-authorization']) {
            return next(new EError("Session info not found. Please login.", 401));
        }
        let payload = null;
        try {
            payload = jwt.verify(req.headers['x-authorization'], jwtSecret);

            const session = await Session.findOne({
                token: req.headers['x-authorization']
            });

            if (!session) {
                return next(new EError("Session is invalid. Please re-login.", 401));
            }
            if (session.status != SESSION_STATUS.ACTIVE) {
                return next(new EError("Session is not valid. Please re-login."))
            }
            req.student = session.student;
            next();

        } catch (err) {
            return next(err);
        }

    };
};

module.exports.USER_TYPE = {
    STUDENT: "student",
    ADMIN: "admin"
};
