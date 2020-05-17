"use strict";

const EError = require("../../helpers/EError");

class BaseRepository {
    constructor (model) {
        if (!model) {
            throw new Error("Invalid model");
        }
        this.__model = model;
    }

    async create (info) {
        return this.__model.create(info);
    }

    async findOne (condition) {
        const result = await this.__model.findOne({ where: condition });
        if (!result) {
            throw new EError(`${this.__model.name} not found`, 404);
        }
    }

    async find (condition) {
        return this.__model.find({ where: condition });
    }
}

module.exports = BaseRepository;