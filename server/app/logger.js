"use strict";

let bunyan = require("bunyan");
let uuidv4 = require("uuid/v4");

let config = {
    name: "masmic-postbox",
    genReqId: (req) => {
        return req.headers["x-request-id"] || uuidv4();
    },
    parseUA: false
};

let logger = bunyan.createLogger({
    name: config.name
});

module.exports = logger;