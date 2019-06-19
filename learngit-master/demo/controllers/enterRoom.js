
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
//进入一个聊天室（测试用）
module.exports = {
    'GET /enterroom': async (ctx, next) => {
        ctx.state.user = parseUser(ctx.cookies.get('name') || '');
        user=ctx.state.user;
        
        if (user) {
            ctx.render('room.html', {
                // user: user
            });
        } 
    }

  
};
