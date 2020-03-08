'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
    async login() {
        const { ctx } = this;
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;
        const userInfo = await ctx.service.base.login(username);

        let msg = '';
        let token = '';
        if (userInfo) { //账号存在 判断密码
            if (userInfo.password == password) {
                token = await this.app.jwt.sign({ username: username }, this.app.config.jwt.secret, { expiresIn: '12h' }); //12小时
                msg = "登录成功！";
            } else {
                msg = "密码错误！";
            }
        } else {
            msg = "账号不存在！";
        }

        ctx.status = 200;

        if (token === '') {
            ctx.body = {
                msg,
                code: 0
            };
        } else {
            ctx.body = {
                msg,
                token,
                code: 1
            };
        }
    }

    async register() {
        const { ctx } = this;
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;
        const phone = ctx.request.body.phone;

        let userInfo = null;

        userInfo = await ctx.service.base.register(username);
        if (userInfo) {
            ctx.status = 200;
            ctx.body = {
                code: 0,
                msg: '账号已存在'
            }
        } else {
            userInfo = await ctx.service.base.findUserByPhone(phone);
            if (userInfo) {
                ctx.status = 200;
                ctx.body = {
                    code: 0,
                    msg: '手机号码已经被注册'
                }
            } else {
                await ctx.service.base.createUser({ username, password, phone });
                let token = await this.app.jwt.sign({ username: username }, this.app.config.jwt.secret, { expiresIn: '12h' }); //12小时
                ctx.status = 200;
                ctx.body = {
                    code: 1,
                    msg: '注册成功',
                    token
                }
            }
        }
    }
}

module.exports = BaseController;