module.exports = {
    'GET /talk': async (ctx, next) => {

        ctx.render('talk.html',{
            title:"聊天吧"
        });
    }
};