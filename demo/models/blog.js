const db = require('../db');

module.exports = db.defineModel('blogs', {
    username: db.STRING(100),
    content: db.TEXT,
    timestamp:db.INTEGER,
    thumup_num:db.INTEGER    
});