const db = require('../db');

module.exports = db.defineModel('users', {
    username: {
        type: db.STRING(100),
        unique: true
    },
    passwd: db.STRING(100),
    nickname: db.STRING(30),
    birth:db.DATEONLY,
    gender: db.INTEGER,
    goodAtLanguage:db.STRING(100),
    studyLanguage:db.STRING(100),
    introduction:db.STRING(255),
    image: db.INTEGER
});