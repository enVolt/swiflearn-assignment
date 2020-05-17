"use strict";

const { Lecture, StudentLecture, Subject, Teacher } = require("../models");
const BaseRepository = require("./BaseRepository");

class LectureRepository extends BaseRepository {
    constructor() {
        super(Lecture);
    }

    async assignLecture (lecture, student) {
        return await StudentLecture.create({
            studentId: student.id,
            lectureId: lecture.id
        });
    }

    async unassignLecture (lecture, student) {
        return await StudentLecture.destroy({
            where: {
                studentId: student.id,
                lectureId: lecture.id
            }
        });
    }

    async assignedLectures (student) {
        return await StudentLecture.findAll({
            where: {
                studentId: student.id
            },
            include: [ {
                model: Lecture,
                include: [ Subject, Teacher ]
            } ]
        });
    }
    
    async getStudents (lecture) {
        return await StudentLecture.findAll({
            where: {
                lectureId: lecture.id
            }
        });
    }

    async findWithDetails (condition) {
        return await Lecture.findAll({where: condition, include: [ Subject, Teacher ]})
    }
};

module.exports = new LectureRepository();