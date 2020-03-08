'use strict';

const Service = require('egg').Service;

class BaseService extends Service {
    async register(username) {
        const { ctx } = this;
        return await ctx.model.User.findByPk(username, { raw: true });
    }

    async login(username) {
        const { ctx } = this;
        return await ctx.model.User.findByPk(username, { raw: true });
    }

    async findUserByPhone(phone) {
        const { ctx } = this;
        return await ctx.model.User.findOne({ where: { phone: phone } }, { raw: true });
    }

    async createUser(data) {
        const { ctx } = this;
        await ctx.model.User.create(data);
        return;
    }
}

module.exports = BaseService;