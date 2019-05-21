module.exports = {
    'GET /chat': async (ctx, next) => {

        ctx.render('chat.html',{
            title:""
        });
    }
};