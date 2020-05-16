"use strict";

const AWS = require("aws-sdk");
const Consumer = require("sqs-consumer");
const uuidv4 = require("uuid/v4");

const config = require("../app/config").aws;
const logger = require("../app/logger");
const bugsnag = require("./bugsnag");

AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.regions.sqs
});

const sqs = new AWS.SQS();

const queueUrlPrefix = config.queueUrlPrefix;

/**
 *
 * @param {String} queueName
 * @param {*} data
 * @param {Object} options
 * @param {Object} options.attr - Queue Message Attributes
 * @param {Number} options.delay - Delay in seconds
 */
module.exports.publish = (logger, queueName, data, options = {}) => {
    let attr = options.attr || {};
    let delay = options.delay || 0;
    let queueUrl = queueUrlPrefix + queueName;

    let attributes = {};
    Object.keys(attr).forEach((key) => {
        let validType = ["string", "number", "boolean"];
        if (~validType.indexOf(typeof attr[key])) {
            attributes[key] = {
                DataType: (typeof attr[key])[0].toUpperCase() + (typeof attr[key]).substring(1),
                StringValue: attr[key].toString()
            };
        }
    });

    let params = {
        MessageBody: JSON.stringify(data),
        QueueUrl: queueUrl,
        MessageAttributes: attributes,
        DelaySeconds: delay
    };

    logger.info("[queueHelper] Publish", {params});

    return sqs.sendMessage(params).promise();
};

/**
 *
 * @param {Object} options
 * @param {String} options.queueName
 * @param {Number} options.batchSize
 * @param {Number} options.visibilityTimeout
 * @param {Function} handler - ({message: body, attr, logger: log}, done)
 */
module.exports.subscribe = (options, handler) => {
    if (!options.queueName) throw new Error("queueName not specified");
    logger.info("Subscribing on Queue " + options.queueName);
    const queueName = options.queueName;
    const consumer = Consumer.create({
        sqs,
        queueUrl: queueUrlPrefix + queueName,
        batchSize: options.batchSize || 1,
        visibilityTimeout: options.visibilityTimeout || undefined,
        terminateVisibilityTimeout: options.terminateVisibilityTimeout || undefined,
        messageAttributeNames: ["All"],
        handleMessage: (message, doneCb) => {
            let xRequestId = uuidv4();

            let log = logger.child({
                req_id: xRequestId,
                type: queueName,
                eventType: "queue"
            });
            let start = Date.now();

            let done = (err) => {
                if (err) {
                    bugsnag.notify(err, {metaData: {info: log.fields, message, error: {...err}}});
                }

                let processingTimeMs = Date.now() - start;
                log.info({err, processingTimeMs});
                return doneCb(err);
            };
            log.info("handleMessage", message.Body);
            let body;
            try {
                body = JSON.parse(message.Body);
            } catch (err) {
                log.info(err, "Unable to parse message");
                return done(err);
            }
            let attr = {};

            message.MessageAttributes && Object.keys(message.MessageAttributes).forEach(attribute => {
                if (message.MessageAttributes[attribute].DataType === "String") {
                    attr[attribute] = message.MessageAttributes[attribute].DataType.StringValue;
                } else if (message.MessageAttributes[attribute].DataType === "Number") {
                    attr[attribute] = +message.MessageAttributes[attribute].DataType.StringValue;
                } else if (message.MessageAttributes[attribute].DataType === "Boolean") {
                    attr[attribute] = message.MessageAttributes[attribute].DataType.StringValue[0].toLowerCase() === "t";
                }
            });
            log.info({body, attr});
            handler({message: body, attr, logger: log, xRequestId}, done);
        }
    });
    consumer.start();

    let sigintCount = 0;
    process.on('SIGINT', () => {
        sigintCount++;
        logger.info("SIGINT Received, stopping consumer - " + sigintCount);
        consumer.stop();
        if (sigintCount > 2) {
            process.exit(1);
        }
        setTimeout(process.exit, options.terminateWaitTime || 10000);
    });

    return consumer;
};

module.exports.acknowledgeMessage = (queueName, message) => {
    let params = {
        QueueUrl: queueUrlPrefix + queueName,
        ReceiptHandle: message.ReceiptHandle
    };

    return sqs.deleteMessage(params).promise();
};

module.exports.receiveMessage = (options, handler) => {
    let params = {
        QueueUrl: queueUrlPrefix + options.queueName,
        MaxNumberOfMessages: options.batchSize || 1,
        VisibilityTimeout: options.visibilityTimeout || undefined,
        AttributeNames: [
            "All"
        ],
        MessageAttributeNames: [
            "All"
        ]
    };

    return sqs.receiveMessage(params).promise();
};