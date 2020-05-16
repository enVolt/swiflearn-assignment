"use strict";

const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid/v4");

const secret = require("../app/config").auth.jwtSecret;
const expiry = require("../app/config").auth.expiry;

const cache = require("../app/cache");

const { CACHE_NAMESPACES } = require("../app/constants");

const EError = require("./EError");

/**
 * @param {String} sessionId
 * @param {User} user
 */
module.exports.persistUserLogin = (req, res, user) => {
    const sessionId = uuidv4();

    const token = jwt.sign({
        sessionId,
        exp: parseInt(Date.now() / 1000) + expiry
    }, secret);

    return cache.set({namespace: "SESSION", key: sessionId}, user)
        .then(() => token);
};

module.exports.updateAuthenticationToken = (req, res, updatedUser) => {
    return cache.set({namespace: "SESSION", key: req.sessionId}, updatedUser);
};

module.exports.authenticate = (type = null) => {
    return (req, res, next) => {
        /**
         * 1. Validate Cookie Session Id
         * 2. Validate JWT Token
         * 3. Compare JWT Token's Session Id with Cookie Session Id
         * 4. Get cached User Data from Redis for Session Id and compare with JWT Token's User Id
         */
        if (!req.headers['x-authorization']) {
            return next(new EError("No Auth token found", 401));
        }
        let payload = null;
        try {
            payload = jwt.verify(req.headers['x-authorization'], secret, {audience: type || undefined});
        } catch (err) {
            return next(err);
        }

        return cache.get({namespace: CACHE_NAMESPACES.SESSION, key: payload.sessionId})
            .then((result) => {
                if (!result) return next(new EError("Invalid Token", 401));
                req.user = result;
                req.sessionId = payload.sessionId;
                return next();
            })
            .catch(next);
    };
};
