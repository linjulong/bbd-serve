'use strict';

const Service = require('egg').Service;

class ConcernService extends Service {
    async create(data) {
        const { ctx } = this;
        await ctx.model.Concern.create(data);
        return;
    }
    async delete(username, concern_id) {
        const { ctx } = this;
        await ctx.model.Concern.destroy({ where: { username: username, concern_id: concern_id } });
        return;
    }
    async concernCount(username) { //个人关注量
        const { ctx } = this;
        return await ctx.model.Concern.count({ where: { username: username } });
    }
    async fansCount(username) { //个人粉丝量
        const { ctx } = this;
        return await ctx.model.Concern.count({ where: { concern_id: username } });
    }
    async show(username) {
        const { ctx } = this;
        return await ctx.model.Concern.findAll({
            include: [{
                model: ctx.model.User,
                attributes: { exclude: ['password'] },
                include: [{ model: ctx.model.GameComment }]
            }],
            where: { username: username }
        })
    }
}

module.exports = ConcernService;