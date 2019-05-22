const url = require('url');

const { default: enforceHttps } = require('koa-sslify');


var https = require('https');
//导入WebSocket模块
const ws = require('ws');

const Cookies = require('cookies');

const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

var https = require('https')
    ,fs = require("fs");

var options = {
    key: fs.readFileSync('./keys/privatekey.pem'),
    cert: fs.readFileSync('./keys/certificate.pem')
};



//引入controller.js的export，用来获得路由信息
const controller = require('./controller');
//引入templating.js的export，用来获得模板信息
const templating = require('./templating');

const rest = require('./rest');

//初始化项目实例
const app = new Koa();
// Force HTTPS on all page
app.use(enforceHttps({
    port: 3001
  }));

//以下是middleware
//多个middleware组成一个处理链
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// parse user from cookie:
// 处理cookie设置的name（在signin.js种设置）
app.use(async (ctx, next) => {
    ctx.state.user = parseUser(ctx.cookies.get('name') || '');
    users=ctx.state.user;
    await next();
});

// static file support:
let staticFiles = require('./static-files');
//导入静态文件
app.use(staticFiles('/static/', __dirname + '/static'));

// parse request body:
app.use(bodyParser());

// 添加 nunjucks as view:
// 不使用缓存，修改view，可以直接刷新浏览器查看效果，否则每次都需重新启动node程序
app.use(templating('views', {
    noCache: true,
    watch: true
}));

//为ctx添加rest()
app.use(rest.restify());
// 添加 controller middleware:
app.use(controller());


// First HTTP server is listening on port 3000 and redirects to second one
// Second HTTPS server is listening on port 3001
//运行的时候直接输入localhost:3000就可以重定向到https下
require('http').createServer(app.callback()).listen(3000);
let server=https.createServer(options, app.callback()).listen(3001);
var SkyRTC = require('skyrtc').listen(server);



SkyRTC.rtc.on('new_connect', function(socket,socketId) {
  
    console.log('创建新连接');
});


SkyRTC.rtc.on('remove_peer', function(socketId) {
    console.log(socketId + "用户离开");
});

SkyRTC.rtc.on('new_peer', function(socket, room) {
   // socket.user=user;
    console.log("新用户" + socket.id + "加入房间" + room);
   
    
});

SkyRTC.rtc.on('socket_message', function(socket, msg) {
    console.log("接收到来自" + socket.id + "的新消息：" + msg);
});

SkyRTC.rtc.on('ice_candidate', function(socket, ice_candidate) {
	console.log("接收到来自" + socket.id + "的ICE Candidate");
});

SkyRTC.rtc.on('offer', function(socket, offer) {
    
	console.log("接收到来自" + socket.id + "的Offer");
});

SkyRTC.rtc.on('answer', function(socket, answer) {
	console.log("接收到来自" + socket.id + "的Answer");
});

SkyRTC.rtc.on('error', function(error) {
	console.log("发生错误：" + error.message);
});

console.log('app started at port 3000...');

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