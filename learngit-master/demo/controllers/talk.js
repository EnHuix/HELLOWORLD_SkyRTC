//语音聊天

module.exports = {

    // 返回语音页面（具体的匹配算法在SkyRTC中实现）
    'GET /talk': async (ctx, next) => {

        ctx.render('talk.html',{
        title:"聊天吧"
        });
    },

};
 