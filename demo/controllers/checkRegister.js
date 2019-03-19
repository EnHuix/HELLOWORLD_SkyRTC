const model = require('../model');
let User=model.User;



module.exports = {

    'POST /checkRegister': async (ctx, next) => {
        let temp = {};
        console.log(ctx.request.body.username);
        var user = await User.findAll({
            where: {
                username: ctx.request.body.username,
            }
        });
        console.log(user.length);
        if(user.length==1){
            temp.success = false;
            temp.data = '*用户名已存在';
            
        }else{
            temp.success = true;
            temp.data = '*用户名可用';
        }
        ctx.body = JSON.stringify(temp);
        
    },
};  