"use strict";

module.exports = (app) => {
    app.use("/students", require("../app/routes/user"));
    app.use("/classes", require("../app/routes/class"));
    app.use("/questions", require("../app/routes/question"));
};
