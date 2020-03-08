'use strict';

module.exports = () => {
    return async (ctx, next) => {
        console.log('send_offline_msg');
        const { app, socket } = ctx;
        const token = ctx.request.query.token;
        let username = '';

        //验证token是否合法
        try {
            username = (await ctx.app.jwt.verify(token, ctx.app.config.jwt.secret)).username;
            //如果有离线消息
            if (await app.redis.exists('message_' + username)) {
                //取出所有离线消息
                let message = await app.redis.lrange('message_' + username, 0, -1);
                //推送目标用户
                await socket.emit('accept_offline_msg', message);
                await app.redis.del('message_' + username);
                //推送成功后删除离线消息
                //await app.redis.ltrim('message_' + username, 0, -1);
            }
        } catch (error) {
            console.log(error)
        }
        await next();
        //断开连接
    }
};