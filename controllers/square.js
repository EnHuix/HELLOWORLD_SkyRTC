//广场类
const model = require('../model');
let moment=model.Moment;



module.exports = {

    //更新页面的moment
    'POST /refresh_moment': async (ctx, next) => {
        let result = {};
        console.log(ctx.request.body.username);

        var blogs = await User.findAll() //查找数据库里的博客 之后可以加上分页功能
        console.log(blogs.length);
       
        result.success = true;
        result.data  = blogs;

        ctx.body = JSON.stringify(result);
        
    },
};  