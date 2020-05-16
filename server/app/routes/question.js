"use strict";

const express = require('express');
const router = express.Router();

const { validateRequest } = require("../../helpers/validator");
const auth = require("../../helpers/auth");

const QuestionController = require("../controllers/QuestionController");

router.post(
    "/",
    auth.authenticate(),
    validateRequest("questionCreate"),
    QuestionController.create
);

router.get(
    "/assigned",
    auth.authenticate(),
    QuestionController.getAssigned
);

module.exports = router;