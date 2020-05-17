"use strict";

const { Lecture, StudentLecture, Subject, Teacher } = require("../models");
const BaseRepository = require("./BaseRepository");

class LectureRepository extends BaseRepository {
    constructor() {
        super(Lecture);
    }

    async assignLecture (lecture, student) {
        return await StudentLecture.create({
            question,
            lecture
        });
    }

    async assignedLectures (student) {
        return await StudentLecture.findAll({
            student,
            isAnswered: false,
            include: [ Lecture ],
            order: "lecture.start"
        });
    }

    async findWithDetails (condition) {
        return await Lecture.findAll({where: condition, include: [ Subject, Teacher ]})
    }
};

module.exports = new LectureRepository();