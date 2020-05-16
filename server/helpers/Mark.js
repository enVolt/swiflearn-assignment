const Mark = require("markup-js");
const moment = require("moment");

Mark.pipes.moment = (date, format) => {
    return moment(new Date(date)).format(format);
};

Mark.includes.epoch = () => {
    return Date.now();
};

module.exports = Mark;