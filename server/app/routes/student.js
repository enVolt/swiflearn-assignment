"use strict";

const express = require('express');
const router = express.Router();

const auth = require("../../helpers/auth");
const { validateRequest } = require("../../helpers/validator");

const StudentController = require("../controllers/StudentController");

router.post(
    "/register",
    validateRequest("studentRegister"),
    StudentController.register
);

router.post(
    "/login",
    validateRequest("studentLogin"),
    StudentController.login
);

router.get(
    "/me",
    auth.authenticate(auth.USER_TYPE.STUDENT),
    StudentController.me
);

module.exports = router;