"use strict";

const AWS = require("aws-sdk");

const awsConfig = require('../app/config').aws;

AWS.config.update({
    secretAccessKey: awsConfig.secretAccessKey,
    accessKeyId: awsConfig.accessKeyId,
    region: awsConfig.regions.ses
});

const ses = new AWS.SES();

module.exports = ses;