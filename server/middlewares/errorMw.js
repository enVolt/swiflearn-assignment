"use strict";

const EError = require("../helpers/EError");

module.exports = (app) => {

    app.use(function (err, req, res, next) {

        if (req.log) {
            req.log.error(err);
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