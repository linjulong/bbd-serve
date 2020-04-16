'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const fs = require('fs');

class UserController extends Controller {
    async uploadAvatar() {
        const { ctx } = this;
        const stream = await ctx.getFileStream();
        const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(stream.filename).toLocaleLowerCase();
        const target = path.join(this.config.baseDir, this.config.avatar, filename);
        const writeStream = fs.createWriteStream(target);
        let avatar = '';

        try {
            // 异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
            avatar = "http://" + this.app.config.cluster.listen.hostname + ":" + this.app.config.cluster.listen.port + this.config.static.prefix + "images/avatar/" + filename;
        } catch (err) {
            // 如果出现错误，关闭管道
            await sendToWormhole(stream);
            ctx.status = 500;
            ctx.body = {
                msg: '未知错误！'
            }
            throw err;
        }
        ctx.status = 201;
        ctx.body = {
            msg: '上传成功！',
            avatar
        }
    }
    async checkReset() {
        const { ctx } = this;
        const username = ctx.request.body.username;
        const phone = ctx.request.body.phone;
        const userInfo = await ctx.service.user.getUserByPk(username);
        let msg = '';
        if (userInfo) {
            if (userInfo.phone != phone) {
                msg = '手机号码不匹配！'
            } else {
                msg = 'ok'
            }
        } else {
            msg = '账号不存在！'
        }

        ctx.status = 200;
        ctx.body = {
            msg
        }
    }
    async reset() { //修改密码
        const { ctx } = this;
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;

        await ctx.service.user.reset(username, password);

        ctx.status = 201;
        ctx.body = {
            msg: '修改成功！'
        }
    }
    async create() {
        const { ctx } = this;
    }
    async destroy() {
        const { ctx } = this;
        ctx.body = '删除';
    }
    async update() {
        const { ctx } = this;
        const userInfo = ctx.request.body;
        await ctx.service.user.updateUserInfo(userInfo);
        const data = await ctx.service.user.getUserByPk(userInfo.username);

        ctx.status = 201;
        ctx.body = {
            msg: '更新成功！',
            userInfo: data
        };
    }
    async show() {
        const { ctx } = this;
        const username = ctx.params.id;
        let userInfo = await ctx.service.user.getUserByPk(username);
        //const concern_number = await ctx.service.concern.concernCount(username);
        let fan_number = await ctx.service.concern.fansCount(username);
        let game_number = await ctx.service.game.count(username);
        //总分
        let rateAll = await ctx.service.comment.sum(username);
        let rateNum = await ctx.service.comment.commentNum(username);
        if (rateNum) {
            rateAll = (rateAll + 1.5) / (rateNum + 1);
        } else {
            rateAll = 1.5;
        }
        userInfo = userInfo.get({ plain: true });
        userInfo.game_number = game_number;
        userInfo.concern_number = userInfo.concerns.length;
        userInfo.fan_number = fan_number;
        userInfo.rate = rateAll;
        ctx.status = 200;
        ctx.body = {
            msg: '查询成功',
            userInfo
        }
    }
    async gameShow() {
        const { ctx } = this;
        const username = ctx.request.query.username;
        const games = await ctx.service.game.getUserGame(username);
        ctx.status = 200;
        ctx.body = {
            msg: '查询成功！',
            games
        }
    }
    async gamesShow() {
        const { ctx } = this;
        const username = ctx.request.query.username;
        const games = await ctx.service.game.getUsersGame(username);
        ctx.status = 200;
        ctx.body = {
            msg: '查询成功！',
            games
        }
    }
    async index() {
        const { ctx } = this;
        ctx.body = 'index';
    }
    async new() {
        const { ctx } = this;
        ctx.body = '创建页面';
    }
    async edit() {
        const { ctx } = this;
        ctx.body = '修改页面';
    }
    async updateChatListUser() {
        const { ctx } = this;
        const users = ctx.request.query.username.split(',');
        let arr = [];
        users.forEach(item => {
            let obj = {};
            obj.username = item;
            arr.push(obj);
        })
        const usersInfo = await ctx.service.user.getUseInfoForChatList(arr);
        
        ctx.status = 200;
        ctx.body = {
            usersInfo
        }
    }
}

module.exports = UserController;