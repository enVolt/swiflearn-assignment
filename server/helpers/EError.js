module.exports = class EError extends Error {
    constructor (message, statusCode, details) {
        super(message);
        this.statusCode = statusCode || 500;
        this.details = details;
        this.name = "EError" + (statusCode ? ` (${statusCode})` : "");
    }
};