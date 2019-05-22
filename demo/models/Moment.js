const db = require('../db');

module.exports = db.defineModel('moments', {
    username: db.STRING(100),
    nickname: db.STRING(100),
    content: db.TEXT,
    //createdAt 表示该状态何时建立
    thumup_num:db.INTEGER    
});