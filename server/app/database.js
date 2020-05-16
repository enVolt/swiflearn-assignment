"use strict";

const { Sequelize } = require("sequelize");

const logger = require("./logger");

const dbConfig = require("./config").db;

const sequelize = new Sequelize(dbConfig);

sequelize.authenticate()
    .then(() => logger.info("DB Connected"))
    .catch(err => {
        logger.error(err);
        process.exit(1);
    });

module.exports = sequelize;