const Sequelize = require("sequelize");
const sequelize = require("../database");

const { GRADE, EXAM_BOARD, TEACHER_STATUS, QUESTION_STATUS } = require("../constants");

const Student = sequelize.define("student", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
    },
    email: Sequelize.STRING,
    name: Sequelize.STRING,
    dateOfBirth: Sequelize.DATEONLY,
    grade: Sequelize.ENUM(Object.values(GRADE)),
    board: Sequelize.ENUM(Object.values(EXAM_BOARD)),
    mobile: Sequelize.STRING
});

const Subject = sequelize.define("subject", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING
    }
});

const Teacher = sequelize.define("teacher", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    status: {
        allowNull: false,
        defaultValue: TEACHER_STATUS.ACTIVE,
        type: Sequelize.ENUM(Object.values(TEACHER_STATUS))
    },
    picture: {
        allowNull: true,
        type: Sequelize.STRING
    }
});
Teacher.belongsTo(Subject);

const Class = sequelize.define("class", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
    },
    description: {
        allowNull: true,
        type: Sequelize.STRING
    },
    start: {
        allowNull: false,
        type: Sequelize.DATE
    },
    end: {
        allowNull: false,
        type: Sequelize.DATE
    },
});
Class.belongsTo(Subject);
Class.belongsTo(Teacher);

const Question = sequelize.define("question", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
    },
    question: {
        allowNull: false,
        type: Sequelize.STRING
    },
    description: {
        allowNull: false,
        type: Sequelize.STRING
    },
    status: {
        allowNull: false,
        defaultValue: QUESTION_STATUS.ACTIVE,
        type: Sequelize.ENUM(Object.values(QUESTION_STATUS))
    }
});
Question.belongsTo(Subject);

const StudentQuestion = sequelize.define("studentQuestion", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
    },
    isAnswered: {
        allowNull: false,
        type: Sequelize.BOOLEAN
    },
    answer: {
        allowNull: false,
        type: Sequelize.TEXT
    }
});
StudentQuestion.belongsTo(Question);
StudentQuestion.belongsTo(Student);

module.exports.Student = Student;
module.exports.Subject = Subject;
module.exports.Teacher = Teacher;
module.exports.Class = Class;
module.exports.Question = Question;
module.exports.StudentQuestion = StudentQuestion;
