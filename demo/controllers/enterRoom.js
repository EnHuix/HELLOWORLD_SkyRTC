
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
