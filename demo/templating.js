//集成Nunjucks的middleware
const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    //使用autoescape这样的代码给每个参数加上默认值，
    //最后使用new nunjucks.FileSystemLoader('views')创建一个文件系统加载器，从views目录读取模板。
    //我们所有html文件都放在views目录下
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

//该函数返回一个middleware，在这个middleware中，我们给ctx安装了render函数
function templating(path, opts) {
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
