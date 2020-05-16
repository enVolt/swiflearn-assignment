"use strict";

const express = require('express');
const router = express.Router();

const { validateRequest } = require("../../helpers/validator");
const auth = require("../../helpers/auth");

const ClassController = require("../controllers/ClassController");

router.post(
    "/",
    auth.authenticate(),
    validateRequest("classCreate"),
    ClassController.create
);

router.get(
    "/upcoming",
    auth.authenticate(),
    ClassController.getUpcomingClasses
);

module.exports = router;