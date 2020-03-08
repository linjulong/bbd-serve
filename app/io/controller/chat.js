'use strict';

module.exports = app => {
    class Controller extends app.Controller {
        async index() {
            const { ctx } = this;
            //读取用户推送的消息
            const message = this.ctx.args[0];
            //判断目标用户是否在线 
            if (await app.redis.exists(message.receive_id)) {
                let receive = await app.redis.get(message.receive_id);
                receive = JSON.parse(receive);
                //向目标用户发送消息 
                ctx.socket.to(receive.id).emit('client_receive_msg', message);
            } else {
                console.log('不在线哦')
                //以message_+username为key维护一个队列，队列记录着关于用户的离线信息
                //插入数据库
                await app.redis.lpush('message_' + message.receive_id, JSON.stringify(message));
            }
            // const say = await this.ctx.service.user.say();
            //this.ctx.app.io.emit('res', 'say');
        }
    }
    return Controller;
};