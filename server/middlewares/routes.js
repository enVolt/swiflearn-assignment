"use strict";

module.exports = (app) => {
    app.use("/students", require("../app/routes/student"));
    app.use("/lectures", require("../app/routes/lecture"));
    app.use("/questions", require("../app/routes/question"));
};
