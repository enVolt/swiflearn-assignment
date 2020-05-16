"use strict";

const { Lecture, StudentLecture } = require("../models");

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
};

module.exports = new LectureRepository();