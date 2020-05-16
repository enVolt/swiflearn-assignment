"use strict";

const StudentRepository = require("../repositories/StudentRepository");
const authHelper = require("../../helpers/auth");
const EError = require("../../helpers/EError");

module.exports.register = async (student) => {
    student.password = await authHelper.securePassword(student.password);
    await studentRepository.create(student);
    return "Student Registered Successfully";
};

module.exports.login = async (loginRequest) => {
    const student = await StudentRepository.findOne({email: loginRequest.email});

    if (!await authHelper.validatePassword(loginRequest.password, student.password)) {
        throw new EError("Invalid Password", 401);
    }

    const token = await authHelper.persistStudentLogin(loginRequest);
    return {
        token
    };
};
