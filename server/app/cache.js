"use strict";

const redis = require("redis");
const Bluebird = require("bluebird");

const logger = require("./logger");
const redisConfig = require("./config").redis;

const { CACHE_KEY_SEPARATOR, DEFAULT_NAMESPACE } = require("./constants");

const redisLogger = logger.child({type: "redis"});

Bluebird.promisifyAll(redis);

const client = redis.createClient({
    ...redisConfig,
    retry_strategy: (options) => {
        // Each retry period increased by 500 ms or 5 seconds maximum
        return Math.max(options.attempt / 2, 5);
    }
});

client.on("ready", () => redisLogger.info("ready Event"));
client.on("connect", () => redisLogger.info("connect Event"));
client.on("reconnecting", (info) => redisLogger.info(info, "reconnecting Event"));
client.on("end", () => redisLogger.info("end Event"));
client.on("error", (err) => redisLogger.error(err, "error Event"));

/**
 * Key Options
 * @typedef {Object} KeyOptions
 * @property {String} key - Key Name
 * @property {String} [namespace] - Name Space for Key
 * @property {String[]} [namespaces] - Multiple Name Space for Key
 */
/**
 * @param {KeyOptions} keyOptions
 * @return {String} key - Final Key for Redis
 */
let getKey = (keyOptions) => {
    let key = keyOptions.key;
    let namespaces = [];
    if (typeof keyOptions === "string") {
        key = keyOptions;
    } else if (keyOptions.namespace) {
        namespaces.push(keyOptions.namespace);
    } else if (keyOptions.namespaces) {
        namespaces.push(...keyOptions.namespaces);
    }
    let finalKey = DEFAULT_NAMESPACE + CACHE_KEY_SEPARATOR;
    namespaces.forEach(namespace => (finalKey += (namespace + CACHE_KEY_SEPARATOR)));
    return finalKey + key;
};

module.exports._client = client;

/**
 * Perform any operation on Cache
 * @param {String} operation Redis Operation
 * @param {...*} args - 1-on-1 mapped to Redis
 */
module.exports.perform = (operation, ...args) => client[operation + "Async"](...args);

/**
 * Get a Key's Value from Cache
 * @param {KeyOptions} keyOptions
 * @return {Promise<result|err>}
 */
module.exports.get = (keyOptions) => {
    return client.getAsync(getKey(keyOptions))
        .then((result) => {
            try {
                let value = JSON.parse(result);
                return Promise.resolve(value);
            } catch (e) {
                return Promise.resolve(result);
            }
        });
};

/**
 * Set a Key in Cache
 * @param {KeyOptions} keyOptions
 * @param {String|Object} value - Value of Key
 * @param {Number} expiry - In Seconds
 */
module.exports.set = (keyOptions, value, expiry) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    if (expiry) {
        return client.setAsync(
            getKey(keyOptions),
            value,
            "EX",
            expiry
        );
    } else {
        return client.setAsync(
            getKey(keyOptions),
            value
        );
    }
};
