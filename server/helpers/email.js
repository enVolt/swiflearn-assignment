"use strict";

const ses = require("./ses");
const libmime = require('libmime');

const send = (logger, options) => {
    if (!options.to) return Promise.reject(new Error("Need to specify To address"));

    if (!options.html) {
        return Promise.reject(new Error("Message Body can not be empty"));
    }

    if (!options.subject) {
        return Promise.reject(new Error("Subject can not be empty"));
    }

    let tags = options.tags ? Object.keys(options.tags).map(tagKey => {
        return {
            Name: tagKey,
            Value: options.tags[tagKey]
        };
    }) : [];

    let params = {
        Destination: {
            ToAddresses: [options.to],
            CcAddresses: options.cc || [],
            BccAddresses: options.bcc || []
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: options.html
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: options.subject
            }
        },
        Source: libmime.encodeWords(options.source),
        ReplyToAddresses: options.replyEmailList || [],
        ConfigurationSetName: options.configurationSetName,
        Tags: tags
    };

    logger.info({fromName: params.Source}, "final-from-name");
    return ses.sendEmail(params).promise();
};

module.exports.send = send;