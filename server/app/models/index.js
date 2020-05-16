const Sequelize = require("sequelize");
const sequelize = require("../database");

const { GRADE, EXAM_BOARD, TEACHER_STATUS, QUESTION_STATUS, SESSION_STATUS } = require("../constants");

const Student = sequelize.define("student", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    dateOfBirth: {
        allowNull: false,
        type: Sequelize.DATEONLY
    },
    grade: {
        allowNull: false,
        type: Sequelize.ENUM(Object.values(GRADE))
    },
    board: {
        allowNull: false,
        type: Sequelize.ENUM(Object.values(EXAM_BOARD))
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING
    },
    mobile: {
        allowNull: false,
        type: Sequelize.STRING
    }
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

const Lecture = sequelize.define("lecture", {
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
Lecture.belongsTo(Subject);
Lecture.belongsTo(Teacher);

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
        defaultValue: false,
        type: Sequelize.BOOLEAN
    },
    answer: {
        allowNull: true,
        type: Sequelize.TEXT
    }
});
StudentQuestion.belongsTo(Question);
StudentQuestion.belongsTo(Student);

const StudentLecture = sequelize.define("studentLecture", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
    },
    isAttended: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
    }
});
StudentLecture.belongsTo(Lecture);
StudentLecture.belongsTo(Student);

const Session = sequelize.define("session", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
    },
    sessionId: {
        allowNull: false,
        type: Sequelize.STRING
    },
    token: {
        allowNull: false,
        type: Sequelize.STRING
    },
    expiry: {
        allowNull: false,
        type: Sequelize.DATE
    },
    status: {
        allowNull: false,
        defaultValue: SESSION_STATUS.ACTIVE,
        type: Sequelize.ENUM(Object.values(SESSION_STATUS))
    }
});
Session.belongsTo(Student);

module.exports.Student = Student;
module.exports.Subject = Subject;
module.exports.Teacher = Teacher;
module.exports.Lecture = Lecture;
module.exports.Question = Question;
module.exports.StudentQuestion = StudentQuestion;
module.exports.StudentLecture = StudentLecture;
module.exports.Session = Session;
