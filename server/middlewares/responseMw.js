"use strict";

module.exports = (app) => {
    app.use((req, res, next) => {
        if (res.body === undefined || res.body == null) {
            return next();
        }
        let statusCode = 200;
        if (res.statusCode && +res.statusCode && res.statusCode >= 200 && res.statusCode < 600) {
            statusCode = res.statusCode;
        }
        res.status(statusCode);
        res.json({result: res.body, error: null, status: res.statusCode || 200});
    });
};