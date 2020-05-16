"use strict";

const express = require('express');
const router = express.Router();

const { validateRequest } = require("../../helpers/validator");
const auth = require("../../helpers/auth");

const LectureController = require("../controllers/LectureController");

router.post(
    "/",
    auth.authenticate(auth.USER_TYPE.ADMIN),
    validateRequest("lectureCreate"),
    LectureController.create
);

router.get(
    "/assigned",
    auth.authenticate(auth.USER_TYPE.ADMIN),
    LectureController.assigned
);

router.get(
    "/assign",
    auth.authenticate(auth.USER_TYPE.STUDENT),
    LectureController.assign
);

module.exports = router;