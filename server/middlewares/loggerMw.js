"use strict";

let bunyan = require("bunyan");
let requestLogger = require("express-bunyan-logger");
let uuidv4 = require("uuid/v4");

let config = {
    name: "masmic-postbox",
    genReqId: (req) => {
        return req.headers["x-request-id"] || uuidv4();
    },
    obfuscate: ["body.password", "req-headers.x-authorization"],
    parseUA: false,
    includesFn: (req, res) => {
        return {
            query: req.query,
            params: req.params
        };
    }
};

let logger = bunyan.createLogger({
    name: config.name
});

let loggerMiddleware = (app) => {
    logger.config = config;
    app.use(requestLogger(config));

    return logger;
};

loggerMiddleware.logger = logger;

module.exports = loggerMiddleware;
