"use strict";

const { Student } = require("../models");
const BaseRepository = require("./BaseRepository");

class StudentRepository extends BaseRepository {
    constructor() {
        super(Student);
    }
};

module.exports = new StudentRepository();