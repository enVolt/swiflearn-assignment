require("dotenv").load();

module.exports = {
    db: process.env.DB_CONNECTION_STRING,
    password: {
        salt: process.env.ENCRYPTION_SALT
    }
};