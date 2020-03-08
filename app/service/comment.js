'use strict';

const Service = require('egg').Service;

class CommentService extends Service {
    async create(data) {
        const { ctx } = this;
        await ctx.model.GameComment.bulkCreate(data);
        return;
    }

    async show(username) {
        const { ctx } = this;
        const Op = this.app.Sequelize.Op;
        return ctx.model.GameComment.findAll({
            where: {
                [Op.or]: [{ rate_id: username }, { be_rate_id: username }]
            },
            include: [{
                model: ctx.model.User,
                attributes: { exclude: ['password'] },
            }]
        });
    }

    //查询rate和
    async sum(username) {
        const { ctx } = this;
        return await ctx.model.GameComment.sum('rate', { where: { be_rate_id: username } });
    }
    async commentNum(username) { //评论数
        const { ctx } = this;
        return await ctx.model.GameComment.count({ where: { be_rate_id: username } });
    }
}

module.exports = CommentService;