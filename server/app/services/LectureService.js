"use strict";

const lectureRepository = require("../repositories/LectureRepository");
const studentRepository = require("../repositories/StudentRepository");

module.exports.get = async () => {
    return await lectureRepository.findWithDetails({});
};

module.exports.create = async (lecture) => {
    lecture = await lectureRepository.create(lecture);
    return "Lecture is created";
};

module.exports.assign = async (studentId, lectureId) => {
    const student = await studentRepository.findOne({id: studentId});
    const lecture = await lectureRepository.findOne({id: lectureId});

    await lectureRepository.assignLecture(lecture, student);

    return "Lecture is assigned to student";
};

module.exports.assigned = async (student) => {
    return await lectureRepository.assignedLectures(student);
};
