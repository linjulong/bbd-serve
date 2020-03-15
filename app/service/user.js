'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async getUserByPk(username) {
        const { ctx } = this;
        return await ctx.model.User.findByPk(username, { attributes: { exclude: ['password'] }, include: [{ model: ctx.model.Concern, include: [{ model: ctx.model.User, attributes: { exclude: ['password'] }, include: [{ model: ctx.model.GameComment }] }] }] });
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

    async addCredit(username) {
        const { ctx } = this;
        await ctx.model.User.increment('credit', { where: { username: username } });
        return;
    }

    async reduceCredit(username) {
        const { ctx } = this;
        await ctx.model.User.decrement('credit', { where: { username: username }, by: 3 });
        return;
    }

    async getUseInfoForChatList(users) {
        const { ctx } = this;
        const Op = this.app.Sequelize.Op;
        return await ctx.model.User.findAll({
            where: { [Op.or]: users }, attributes: { exclude: ['password'] }, raw: true
        });
    }
}

module.exports = UserService;