

module.exports = {
    'GET /test': async (ctx, next) => {
       
        // let user = ctx.state.user;
        // if (user) {
        //     ctx.render('room.html', {
        //         user: user
        //     });
        // } else {
        //     ctx.response.redirect('/signin');
        // }
        ctx.render('test.html', {
            title:"test"
        });
    }
};
