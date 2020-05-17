"use strict";

const StudentRepository = require("../repositories/StudentRepository");
const authHelper = require("../../helpers/auth");
const EError = require("../../helpers/EError");

const validateExistingRegistration = async (student) => {
    const mobileStudentExist = await StudentRepository.doesExist({mobile: student.mobile});
    if (mobileStudentExist) {
        throw new EError("This mobile number is already registered", 400);
    }

    const emailStudentExist = await StudentRepository.findOne({email: student.email}, false);
    if (emailStudentExist) {
        throw new EError("This email is already registered", 400);
    }
};

module.exports.register = async (student) => {
    await validateExistingRegistration(student);

    const plainPasssword = student.password;
    student.password = await authHelper.securePassword(plainPasssword);
    await studentRepository.create(student);
    return await this.login({
        email: student.email,
        password: plainPasssword
    });
};

module.exports.login = async (loginRequest) => {
    const student = await StudentRepository.findOne({email: loginRequest.email});

    if (!await authHelper.validatePassword(loginRequest.password, student.password)) {
        throw new EError("Invalid Password", 401);
    }

    const token = await authHelper.persistStudentLogin(loginRequest);
    return {
        token,
        name: student.name,
        email: student.email
    };
};
