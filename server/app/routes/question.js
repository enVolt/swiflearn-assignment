"use strict";

const express = require('express');
const router = express.Router();

const { validateRequest } = require("../../helpers/validator");
const auth = require("../../helpers/auth");

const QuestionController = require("../controllers/QuestionController");

router.post(
    "/",
    auth.authenticate(auth.USER_TYPE.ADMIN),
    validateRequest("questionCreate"),
    QuestionController.create
);

router.get(
    "/assigned",
    auth.authenticate(auth.USER_TYPE.STUDENT),
    QuestionController.assigned
);

router.put(
    "/assign",
    auth.authenticate(auth.USER_TYPE.ADMIN),
    validateRequest("questionAssign"),
    QuestionController.assign
)

module.exports = router;