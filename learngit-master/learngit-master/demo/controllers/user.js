// User

const model = require('../model');
let User=model.User;

var index=0;  //用来判断是第几个连接到服务器的，便于判断
var nickname; //用来存放用户的昵称
var username; //用来存放用户的用户名
var image; //用来存放用户头像索引


//判断该用户是否合法（是否存在于数据库，并且用户名与密码匹配）
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
                username=user[0].username;
                image = user[0].image;
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

// 插入数据到数据库
function insertDataToUser(ctx,next){
    var tmpLanguage=new Array();    
    
   
    var goodAtLanguage="";
    var studyLanguage="";
    var else_languages_goodat=ctx.request.body.else_languages_goodat;
    var else_languages_study=ctx.request.body.else_languages_study;

    tmpLanguage=ctx.request.body.goodAtLanguage;
    console.log(tmpLanguage);
    if(typeof tmpLanguage === 'string'){    //如果只选了一个，返回的则是string，否则返回object
        goodAtLanguage=tmpLanguage+";";
    }else{
        for(var i=0;i<tmpLanguage.length;i++){
            goodAtLanguage+=tmpLanguage[i];
            goodAtLanguage+=";";
        }
    }
    //如果用户填了其他擅长的语言，则把这个给加上
    if(else_languages_goodat!=""){
        goodAtLanguage+=else_languages_goodat;
        goodAtLanguage+=";";
    }
   
    tmpLanguage=ctx.request.body.studyLanguage;
    if(typeof tmpLanguage === 'string'){ //如果只选了一个
       studyLanguage=tmpLanguage+";";
    }else{
        for(var i=0;i<tmpLanguage.length;i++){
            studyLanguage+=tmpLanguage[i];
            studyLanguage+=";";
        }
    }
    //如果用户填了其他想学的语言，则把这个给加上
    if(else_languages_study!=""){
        studyLanguage+=else_languages_study;
        studyLanguage+=";";
    }
    
   
    (async () => {
        var user = await User.create({
            username: ctx.request.body.username,
            passwd: ctx.request.body.password,
            nickname: ctx.request.body.nickname,
            birth: ctx.request.body.birth,
            gender: ctx.request.body.gender,
            goodAtLanguage:goodAtLanguage,
            studyLanguage:studyLanguage,
            introduction: ctx.request.body.introduction,
            image: (Math.ceil(Math.random()*900))%10
        });
        console.log('created: ' + JSON.stringify(user));
    })();
  
}

//更新数据库中的数据
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

    //返回登陆的页面
    'GET /signin': async (ctx, next) => {
        // let names = '甲乙丙丁戊己庚辛壬癸';
        // let name = names[index % 10];
        ctx.render('signin.html', {
            title:"登陆"
        });
    },

    //处理登陆页面的表单信息，输入准确时返回首页，否则返回登陆失败的页面
    'POST /signin': async (ctx, next) => {
              
        var success=await haveUser(ctx,next);
        //查询成功后登入首页，设置cookies和user对象信息
        index++;
        let name = nickname;
        let user = {
            id: index,
            name: name,
            username: username,
            image: image
        };
        let value = Buffer.from(JSON.stringify(user)).toString('base64');
        console.log(`Set cookie value: ${value}`);
        ctx.cookies.set('name', value);
       
        if(success){
            ctx.render('homepage.html',{
                    title:"首页"
                    // user:user
            });
        }else{
            ctx.render('signin-failed.html',{
                title:"登陆"
            });
        }      
      
    },

    //返回注册的页面
    'GET /register': async (ctx, next) => {
      
        ctx.render('register.html',{
            title:"注册账号"
        });
       // ctx.response.redirect('/signin');
    },

    //接收前端的表单数据，处理该表单数据
    'POST /register': async (ctx, next) => {
       
        insertDataToUser(ctx,next);   //插入数据

        ctx.response.redirect('/signin');
    },

    //返回重置密码的页面
    'GET /reset_passwd': async (ctx, next) => {
      
        ctx.render('reset_passwd.html',{
            title:"重置密码"
        });
       // ctx.response.redirect('/signin');
    },
    
    //处理前端表单的数据，更新数据库
    'POST /reset_passwd': async (ctx, next) => {
       
        updateDataForUser(ctx,next);   //插入数据

        ctx.response.redirect('/signin');
    },

    //处理登出事件
    'GET /signout': async (ctx, next) => {
        //ctx.cookies.set('name', '');
        ctx.response.redirect('/signin');
    },


    //检查注册信息是否满足要求，比如用户名是否已经存在，密码是否符合格式要求
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