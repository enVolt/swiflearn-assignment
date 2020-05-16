"use strict";

/**
 * Init Sentry or Bugsnag Here for Error Notification
 */

const bugsnag = require("@bugsnag/node");

const { bugsnagKey } = require("../app/config");
var packageInfo = require("../package.json");

const bugsnagClient = bugsnag({
    apiKey: bugsnagKey,
    appVersion: packageInfo.version,
    filters: ["x-authorization", "password"]
});

let shouldDropError = (err) => {
    if (err.error && err.error.code === "ForaUnprocessableEntity") {
        return true;
    } else if (err.error && err.error.code === "ForaForbidden") {
        return true;
    }
    return false;
};

bugsnagClient.customRequestNotify = (err, req) => {
    if (shouldDropError(err)) {
        return;
    }
    let error;
    if (err instanceof Error) {
        error = err;
    } else {
        error = new Error((err.error && err.error.message) || err.message || "Unknown Error");
    }
    bugsnagClient.notify(
        error,
        {
            metaData: {
                info: err,
                request: {
                    body: req.body,
                    headers: req.headers,
                    method: req.method,
                    originalUrl: req.originalUrl,
                    params: req.params,
                    cookies: req.cookies,
                    query: req.query,
                    statusCode: req.statusCode,
                    req_id: req.log.fields.req_id
                },
                user: {
                    sessionId: req.sessionId,
                    userUuid: req.user && req.user.userUuid
                }
            }
        }
    );
};

module.exports = bugsnagClient;