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
}

module.exports = CommentService;