const model = require('../model');
let Moment=model.Moment;
let User = model.User;

const APIError = require('../rest').APIError;

var gid = 0; //用来唯一标识动态
var user; //用来标识当前的user


function nextId() {
    gid ++;
    return 't' + gid;
}

var moments = [];

//将时间戳转换为当地时间
function getLocalTime(nS) {     
    return new Date(nS).toLocaleString();
 }

//得到数据库中所有的moment
function get_moments(){
    var p = new Promise(function (resolve, reject) {
        console.log('start new Promise...');
        (async () => {
            var result = await Moment.findAll();
            var moment;
            for(var i=0;i<result.length;i++){
                var user = await User.findAll({
                    where:{
                        username: result[i].username
                    }
                })

                moment={
                    id: nextId(),
                    name: user[0].nickname,
                    image: user[0].image,
                    content: result[i].content.trim(),
                    createdAt: getLocalTime(result[i].createdAt)
                }
                
                moments.push(moment);
            }
            
            resolve(result.length);
        })();  
    });
   

    return p;
}

// 插入数据到数据库
function insertDataToMoment(ctx,next){    
   
    (async () => {
        var moment = await Moment.create({
            username: user.username,
            content:ctx.request.body.content,
            thumup_num:0
        });
        console.log('created: ' + JSON.stringify(moment));
    })();
  
}

function parseUser(obj) {
    if (!obj) {
        return;
    }
    // console.log('try parse: ' + obj);
    let s = '';
    if (typeof obj === 'string') {
        s = obj;
    } else if (obj.headers) {
        let cookies = new Cookies(obj, null);
        s = cookies.get('name');
    }
    if (s) {
        try {
            let user = JSON.parse(Buffer.from(s, 'base64').toString());
            // console.log(`User: ${user.name}, ID: ${user.id}`);
            return user;
        } catch (e) {
            // ignore
        }
    }
}

module.exports = {

    
    //未完成
    //返回状态的页面
    'GET /moment_page': async (ctx, next) => {
        ctx.state.user = parseUser(ctx.cookies.get('name') || '');
        user=ctx.state.user;
        console.log('用户',user);
        moments=[]
        ctx.render('moment.html', {
            title:"心情"
        });
    },

    //返回moments列表
    'GET /moment/moments': async (ctx, next) => {
        // console.log(user);
        await get_moments();
        console.log(moments);
        ctx.rest({
            moments: moments
        });
    },

    //创建一个新的状态，并返回创建后的对象
    'POST /moment/moments': async (ctx, next) => {
        var
            t = ctx.request.body,
            moment;

        ctx.state.user = parseUser(ctx.cookies.get('name') || '');
        user=ctx.state.user; //每次必须更新一次user，否则可能会被其他主机的user覆盖

        if (!t.content || !t.content.trim()) {
            throw new APIError('invalid_input', 'Missing content');
        }
        //将创建的moment插入到数据库
        insertDataToMoment(ctx,next);
        
        //将创建的moment显示
        moment = {
            id: nextId(),
            name: user.name,
            image: user.image,
            content: t.content.trim(),
            createdAt:getLocalTime(Date.now())
        };
        moments.push(moment);
        ctx.rest(moment);
    },

    //更新一个moment，并将更新后的moment返回
    'PUT /moment/moments/:id': async (ctx, next) => {
        var
            t = ctx.request.body,
            index = -1,
            i, moment;
        if (!t.name || !t.name.trim()) {
            throw new APIError('invalid_input', 'Missing name');
        }
        if (!t.content || !t.content.trim()) {
            throw new APIError('invalid_input', 'Missing content');
        }
        for (i=0; i<moments.length; i++) {
            if (moments[i].id === ctx.params.id) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            throw new APIError('notfound', 'moment not found by id: ' + ctx.params.id);
        }
        moment = moments[index];
        moment.name = t.name.trim();
        moment.content = t.content.trim();
        ctx.rest(moment);
    },

    //删除一个moment
    'DELETE /moment/moments/:id': async (ctx, next) => {
        var i, index = -1;
        for (i=0; i<moments.length; i++) {
            if (moments[i].id === ctx.params.id) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            throw new APIError('notfound', 'moment not found by id: ' + ctx.params.id);
        }
        ctx.rest(moments.splice(index, 1)[0]);
    },
};  