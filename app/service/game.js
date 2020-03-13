'use strict';

const Service = require('egg').Service;

class GameService extends Service {
    async create(data) {
        const { ctx } = this;
        return await ctx.model.Game.create(data);
    }
    async createGameAthletes(data) {
        const { ctx } = this;
        await ctx.model.GameAthletes.bulkCreate(data);
        return;
    }
    async index(page, district, game_type, duration, game_part, orientation, rate, chargeable, keyword) {
        const { ctx } = this;
        const Op = this.app.Sequelize.Op;

        let where = {};
        //大于现在的时间的
        where.game_time = {
            [Op.gt]: new Date().getTime()
        };
        //可加入人数大于0的
        where.game_number = {
            [Op.gt]: 0
        }
        where.rate = {
            [Op.gte]: rate
        };
        if (district != '全部') {
            where.district = district;
        }
        if (game_type != '全部') {
            where.game_type = game_type;
        }
        if (duration != 0) {
            where.duration = duration;
        }
        if (orientation != '全部') {
            where.orientation = {
                [Op.like]: `%${orientation}%`
            }
        }
        if (chargeable !== '全部') {
            where.chargeable = chargeable;
        }
        let order = [];

        if (game_part == '最新') {
            order[0] = ['create_stamp', 'DESC'];
        }

        let include = [{
            model: ctx.model.User,
            include: [{ model: ctx.model.GameComment }]
        }];

        if (keyword != '') {
            include[0].where = {
                nickname: {
                    [Op.like]: `%${keyword}%`
                }
            }
        }

        return await ctx.model.Game.findAndCountAll({
            limit: 10,
            offset: (page - 1) * 10, //跳过条数
            where: where,
            include: include,
            order: order
        })
    }
    async findByPk(game_id) {
        const { ctx } = this;
        return ctx.model.Game.findByPk(game_id, {
            include: [{
                model: ctx.model.GameAthletes,
                include: [{
                    model: ctx.model.User,
                    attributes: { exclude: ['password'] },
                }]
            }, {
                model: ctx.model.User,
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: ctx.model.GameComment
                }]
            }, {
                model: ctx.model.GameComment
            }]
        });
    }
    async join(data) {
        const { ctx } = this;
        await ctx.model.GameAthletes.create(data);
        await ctx.model.Game.decrement('game_number', { where: { game_id: data.game_id } });
        return;
    }
    async count(username) {
        const { ctx } = this;
        return await ctx.model.Game.count({ where: { username: username } });
    }
    async getUserGame(username) {
        const { ctx } = this;
        return await ctx.model.Game.findAll({
            include: [{
                model: ctx.model.GameAthletes,
                where: { username: username }
            },
            {
                model: ctx.model.User,
                attributes: { exclude: ['password'] }
            }, {
                model: ctx.model.GameComment
            }
            ]
        });
    }

    async getUsersGame(username) {
        const { ctx } = this;
        const Op = this.app.Sequelize.Op;
        return await ctx.model.Game.findAll({
            where: {
                game_time: {
                    [Op.gt]: new Date().getTime()
                }
            },
            include: [{
                model: ctx.model.GameAthletes,
                where: {
                    username: username,
                }
            }, {
                model: ctx.model.User,
                attributes: { exclude: ['password'] }
            }]
        });
    }

    async delete(game_id) {
        const { ctx } = this;
        await ctx.model.GameAthletes.destroy({ where: { game_id } });
        await ctx.model.Game.destroy({ where: { game_id } });
    }

    async exitGame(game_id, username) {
        const { ctx } = this;
        //console.log(game_id, username)
        await ctx.model.GameAthletes.destroy({ where: { game_id: game_id, username: username } });
        return;
    }
}

module.exports = GameService;