const model = require('../model');
let User=model.User;

function insertDataToUser(ctx,next){
    // console.log(ctx.request.body.goodAtLanguage)
    // console.log(ctx.request.body.introduction)
    var tmpLanguage=new Array();    
    
   
    var goodAtLanguage="";
    var studyLanguage="";

    tmpLanguage=ctx.request.body.goodAtLanguage;
    if(typeof tmpLanguage === 'string'){    //如果只选了一个，返回的则是string，否则返回object
        goodAtLanguage=tmpLanguage+";";
    }else{
        for(var i=0;i<tmpLanguage.length;i++){
            goodAtLanguage+=tmpLanguage[i];
            goodAtLanguage+=";";
        }
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
    
   
    (async () => {
        var user = await User.create({
            username: ctx.request.body.username,
            passwd: ctx.request.body.password,
            nickname: ctx.request.body.nickname,
            birth: ctx.request.body.birth,
            gender: ctx.request.body.gender,
            goodAtLanguage:goodAtLanguage,
            studyLanguage:studyLanguage,
            introduction: ctx.request.body.introduction
        });
        console.log('created: ' + JSON.stringify(user));
    })();
  
}

module.exports = {
    'GET /register': async (ctx, next) => {
      
        ctx.render('register.html',{
            title:"注册账号"
        });
       // ctx.response.redirect('/signin');
    },

    'POST /register': async (ctx, next) => {
       
        insertDataToUser(ctx,next);   //插入数据

        ctx.response.redirect('/signin');
    },
};  