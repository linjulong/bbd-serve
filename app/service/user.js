'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async getUserByPk(username) {
        const { ctx } = this;
        return await ctx.model.User.findByPk(username, { attributes: { exclude: ['password'] }, include: [{ model: ctx.model.Concern }] });
    }
    async updateUserInfo(userInfo) {
        const { ctx } = this;
        await ctx.model.User.update(userInfo, { where: { username: userInfo.username } });
        return;
    }
    async reset(username, password) {
        const { ctx } = this;
        await ctx.model.User.update({ password: password }, { where: { username: username } });
        return;
    }
}

module.exports = UserService;