
//进入一个聊天室（测试用）
module.exports = {
    'GET /enterroom': async (ctx, next) => {
        let user = ctx.state.user;
        
        if (user) {
            ctx.render('room.html', {
                user: user
            });
        } 
    }

  
};
