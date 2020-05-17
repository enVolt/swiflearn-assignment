"use strict";

const studentRepository = require("../repositories/StudentRepository");
const authHelper = require("../../helpers/auth");
const EError = require("../../helpers/EError");

const validateExistingRegistration = async (student) => {
    const mobileStudentExist = await studentRepository.doesExist({mobile: student.mobile});
    if (mobileStudentExist) {
        throw new EError("This mobile number is already registered", 400);
    }

    const emailStudentExist = await studentRepository.doesExist({email: student.email}, false);
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
    const student = await studentRepository.findOne({email: loginRequest.email});

    const isValidPassowrd = await authHelper.validatePassword(loginRequest.password, student.password);

    if (!isValidPassowrd) {
        throw new EError("Invalid Password", 401);
    }

    const token = await authHelper.persistStudentLogin(student);
    return {
        token,
        name: student.name,
        email: student.email
    };
};
