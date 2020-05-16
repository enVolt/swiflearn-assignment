"use string";

const rp = require("request-promise");
const Promise = require("bluebird");
const errors = require("request-promise/errors");

const ENDPOINTS = require("../app/constants").ENDPOINTS;
const BASEURL = require("../app/config").backendBaseurl;

const EError = require("./EError");

let request = (req, method = "get", uri, options) => {
    if (typeof uri === "object") {
        options = uri;
    } else if (typeof uri === "string") {
        options.uri = uri;
    } else {
        throw new Error("Invalid typeof URI");
    }
    if (!options) options = {};
    if (!options.headers) options.headers = {};
    options.json = true;

    let p = null;
    if (req.user && !req.user.accessToken) {
        p = rp.put(
            BASEURL + ENDPOINTS.GET_ACCESS_TOKEN.uri,
            {
                json: true,
                qs: options ? {
                    ...options.qs,
                    authToken: req.user.authToken
                } : {
                    authToken: req.user.authToken
                }
            }
        )
            .then(result => {
                req.user.accessToken = result.result;
                return;
            });
    } else {
        p = Promise.resolve();
    }
    return p.then(() => {
        if (req.user) {
            options.headers["X-Authorization"] = req.user.authToken;
            options.headers["X-Access-Token"] = req.user.accessToken;
        }
        return rp[method.toLowerCase()](options)
            .then((result) => Promise.resolve(result.result));
    })
        .catch(errors.StatusCodeError, (err) => Promise.reject(new EError(err.error.error.message, err.statusCode, err.error.error)));
};

request.get = (req, ...args) => request(req, "get", ...args);
request.put = (req, ...args) => request(req, "put", ...args);
request.post = (req, ...args) => request(req, "post", ...args);
request.delete = (req, ...args) => request(req, "delete", ...args);

request.perform = (req, endpoint, ...args) => request(req, endpoint.method, BASEURL + endpoint.uri, ...args);

request.ENDPOINTS = ENDPOINTS;
module.exports = request;
