"use strict";

const express = require('express');
const router = express.Router();

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

module.exports = router;