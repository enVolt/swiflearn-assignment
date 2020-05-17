"use strict";

const express = require('express');
const router = express.Router();

const { validateRequest } = require("../../helpers/validator");
const auth = require("../../helpers/auth");

const LectureController = require("../controllers/LectureController");

router.get(
    "/",
    auth.authenticate(auth.USER_TYPE.ADMIN),
    LectureController.get
);

router.get(
    "/:id/students",
    auth.authenticate(auth.USER_TYPE.ADMIN),
    LectureController.getStudents
);

router.post(
    "/",
    auth.authenticate(auth.USER_TYPE.ADMIN),
    validateRequest("lectureCreate"),
    LectureController.create
);

router.get(
    "/assigned",
    auth.authenticate(auth.USER_TYPE.STUDENT),
    LectureController.assigned
);

router.put(
    "/assign",
    auth.authenticate(auth.USER_TYPE.ADMIN),
    validateRequest("lectureAssign"),
    LectureController.assign
);

router.put(
    "/unassign",
    auth.authenticate(auth.USER_TYPE.ADMIN),
    validateRequest("lectureAssign"),
    LectureController.unassign
);

module.exports = router;