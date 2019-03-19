// sign in:
const model = require('../model');
let User=model.User;

var index=0; //用来给用户赋予头像和id
var nickname; //用来存放用户的昵称
function haveUser(ctx,next){

    var p = new Promise(function (resolve, reject) {
        console.log('start new Promise...');
        (async () => {
            var user = await User.findAll({
                where: {
                    username: ctx.request.body.username,
                    passwd: ctx.request.body.password
                }
            });
            if(user.length==1){
                nickname=user[0].nickname;
            }
            
            resolve(user.length);
        })();  
    });

    p.then(function(input){
        if(input!=0){
            console.log("密码正确");
            
        }else{
            console.log("密码错误");

        }
    })
     return p;
}


module.exports = {
    'GET /signin': async (ctx, next) => {
        // let names = '甲乙丙丁戊己庚辛壬癸';
        // let name = names[index % 10];
        ctx.render('signin.html', {
            title:"登陆"
        });
    },

    'POST /signin': async (ctx, next) => {
        // index ++;
        // let name = ctx.request.body.name || '路人甲';
        // let user = {
        //     id: index,
        //     name: name,
        //     image: index % 10
        // };
        // let value = Buffer.from(JSON.stringify(user)).toString('base64');
        // console.log(`Set cookie value: ${value}`);
        // ctx.cookies.set('name', value);
        // ctx.response.redirect('/');
       
        var success=await haveUser(ctx,next);
        //查询成功后登入首页，设置cookies和user对象信息
        index ++;
        let name = nickname;
        let user = {
            id: index,
            name: name,
            image: index % 10
        };
        let value = Buffer.from(JSON.stringify(user)).toString('base64');
        console.log(`Set cookie value: ${value}`);
        ctx.cookies.set('name', value);
       
        if(success){
            ctx.render('homepage.html',{
                    title:"首页"
            });
        }else{
            ctx.render('signin-failed.html',{
                title:"登陆"
            });
        }      
      
    }
};
