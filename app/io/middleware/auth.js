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
            await app.redis.set(username, JSON.stringify(data));
        } catch (error) {
            console.log(error)
            socket.emit('connect_deny');
            socket.disconnect();
            return;
        }
        // const say = await ctx.service.user.say();
        // ctx.socket.emit('res', 'auth!' + say + 'id:' + ctx.socket.id);
        await next();
        //断开连接
        await app.redis.del(username);
        console.log('disconnect!');
    };
};