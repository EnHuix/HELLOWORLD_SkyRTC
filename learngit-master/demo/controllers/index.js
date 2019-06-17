// index:


module.exports = {

    //返回程序的入口页面
    'GET /': async (ctx, next) => {
       
        // let user = ctx.state.user;
        // if (user) {
        //     ctx.render('room.html', {
        //         user: user
        //     });
        // } else {
        //     ctx.response.redirect('/signin');
        // }
        ctx.response.redirect('/signin');
    },

};
