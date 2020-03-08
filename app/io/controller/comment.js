'use strict';

module.exports = app => {
    class Controller extends app.Controller {
        async index() {
            const { ctx } = this;
            const message = this.ctx.args[0];
            for (var i = 0; i < message.length; i++) {
                if (await app.redis.exists(message[i].be_rate_id)) {
                    let receive = await app.redis.get(message[i].be_rate_id);
                    receive = JSON.parse(receive);
                    ctx.socket.to(receive.id).emit('client_receive_comment', message[i]);
                } else {
                    console.log('不在线哦')
                }
            }

            // const say = await this.ctx.service.user.say();
            //this.ctx.app.io.emit('res', 'say');
        }
    }
    return Controller;
};