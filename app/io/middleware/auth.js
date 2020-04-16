'use strict';

module.exports = () => {
    return async (ctx, next) => {
        console.log('auth');
        const { app, socket } = ctx;
        const token = ctx.request.query.token;
        const id = socket.id;
        let username = '';

        //验证token是否合法
        try {
            username = (await ctx.app.jwt.verify(token, ctx.app.config.jwt.secret)).username;
            let data = { id, username };
            //判断用户是否在线 如果在线则强制退出
            if (await app.redis.exists(username)) {
                let receive = await app.redis.get(username);
                receive = JSON.parse(receive);
                console.log('已经有人在线');
                ctx.socket.to(receive.id).emit('client_logout');
            }
            await app.redis.set(username, JSON.stringify(data));
        } catch (error) {
            console.log(error)
            socket.emit('connect_deny');
            socket.disconnect();
            return;
        }
        await next();
        //断开连接
        //解决强制退出id被删除的问题
        let receive = await app.redis.get(username);
        receive = JSON.parse(receive);
        if (id === receive.id) {
            await app.redis.del(username);
        }
        console.log('disconnect!');
    };
};