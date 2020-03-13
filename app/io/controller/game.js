'use strict';

module.exports = app => {
    class Controller extends app.Controller {
        async verify() {
            const { ctx } = this;
            const message = ctx.args[0];
            if (await app.redis.exists(message.receive_id)) {
                let receive = await app.redis.get(message.receive_id);
                //向目标用户发送消息
                receive = JSON.parse(receive);
                ctx.socket.to(receive.id).emit('client_receive_comment', message);
            } else {
                console.log('不在线哦')
                //以message_+username为key维护一个队列，队列记录着关于用户的离线信息
                //插入数据库
                await app.redis.lpush('message_' + message.receive_id, JSON.stringify(message));
            }
        }

        async notiy() {
            const { ctx } = this;
            const message = ctx.args[0];
            if (await app.redis.exists(message.receive_id)) {
                let receive = await app.redis.get(message.receive_id);
                //向目标用户发送消息
                receive = JSON.parse(receive);
                ctx.socket.to(receive.id).emit('client_receive_comment', message);
            } else {
                console.log('不在线哦')
                //以message_+username为key维护一个队列，队列记录着关于用户的离线信息
                //插入数据库
                await app.redis.lpush('message_' + message.receive_id, JSON.stringify(message));
            }
        }
    }
    return Controller;
};