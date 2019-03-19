// sign out:

module.exports = {

    'GET /signout': async (ctx, next) => {
        //ctx.cookies.set('name', '');
        ctx.response.redirect('/signin');
    }
};
