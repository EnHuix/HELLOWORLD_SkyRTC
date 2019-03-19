const model = require('../model');
let User=model.User;


function updateDataForUser(ctx,next){
    //console.log(ctx.request.body.username,ctx.request.body.password,ctx.request.body.sex);
    (async () => {
        var user = await User.findAll({
            where: {
                username: ctx.request.body.username
            }
        });
        console.log(user[0])
        //findAll查询出来是数组
        user=user[0];
        user.passwd=ctx.request.body.password;
        user.updatedAt = Date.now();
        user.version ++;
        await user.save();
    })();
  
}


module.exports = {
    'GET /reset_passwd': async (ctx, next) => {
      
        ctx.render('reset_passwd.html',{
            title:"重置密码"
        });
       // ctx.response.redirect('/signin');
    },
    
    'POST /reset_passwd': async (ctx, next) => {
       
        updateDataForUser(ctx,next);   //插入数据

        ctx.response.redirect('/signin');
    },
};  