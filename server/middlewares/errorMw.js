"use strict";

const bugsnag = require("../helpers/bugsnag");
const EError = require("../helpers/EError");

module.exports = (app) => {

    app.use(function (err, req, res, next) {
        bugsnag.customRequestNotify(err, req);

        if (req.log) {
            req.log.error(err);
        }
        if (req.t) {
            req.t.rollback();
            req.t = null;
        }
        if (err instanceof EError) {
            return res.status(err.statusCode).json({
                result: null,
                error: {
                    message: err.message,
                    details: err.details,
                    stack: req.app.get('env') === 'development' ? err.stack : undefined
                }
            });
        } else if (err.error) {
            return res.status(+err.status || 500).json({
                result: null,
                error: err.error
            });
        } else {
            return res.status(+err.status || 500).json({
                result: null,
                error: err
            });
        }
    });
};