"use strict";

const bunyan = require("bunyan");
const uuidv4 = require("uuid/v4");

const packageName = require("../package.json").name;

const config = {
    name: packageName,
    genReqId: (req) => {
        return req.headers["x-request-id"] || uuidv4();
    },
    parseUA: false
};

const logger = bunyan.createLogger({
    name: config.name
});

module.exports = logger;