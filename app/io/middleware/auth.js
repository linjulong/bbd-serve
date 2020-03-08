'use strict';

module.exports = () => {
    return async (ctx, next) => {
        console.log('新连接');
        const { app, socket } = ctx;
        const token = ctx.request.query.token;
        const id = socket.id;
        let username = '';

        //验证token是否合法
        try {
            username = (await ctx.app.jwt.verify(token, ctx.app.config.jwt.secret)).username;
            let data = { id, username };
            await app.redis.set(username, JSON.stringify(data));
            // await app.redis.lpush('message', JSON.stringify(data));
            // let data1 = await app.redis.lrange('message', 0, -1);
            //await app.redis.exists(username);
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