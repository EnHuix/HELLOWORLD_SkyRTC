function getUser(path, opts) {
    //变量env表示Nunjucks模板引擎对象
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        ctx.render = function (view, model) {
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            ctx.response.type = 'text/html';
        };
        await next();
    };
}

module.exports = templating;
