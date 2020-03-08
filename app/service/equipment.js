'use strict';

const Service = require('egg').Service;

class EquipmentService extends Service {
    async create(data) {
        const { ctx } = this;
        return await ctx.model.Equipment.create(data);
    }
    async createImg(data) {
        const { ctx } = this;
        await ctx.model.EquipmentImage.bulkCreate(data);
        return;
    }
    async index(page, district) {
        const { ctx } = this;
        let where = {};
        if (district != '全城') {
            where.district = district;
        }
        return await ctx.model.Equipment.findAndCountAll({
            include: [{
                model: ctx.model.EquipmentImage
            }, {
                model: ctx.model.User,
                attributes: { exclude: ['password'] },
            }],
            order: [
                ['create_stamp', 'DESC']
            ],
            offset: (page - 1) * 10,
            limit: 10, //限制一页10条
            where: where,
            distinct: true
        })
    }
    async show(equipment_id) {
        const { ctx } = this;
        return await ctx.model.Equipment.findByPk(equipment_id, {
            include: [{
                model: ctx.model.EquipmentImage
            }, {
                model: ctx.model.User,
                attributes: { exclude: ['password'] },
            }],
        })
    }

    async showEquipmentByUsers(username) {
        const { ctx } = this;
        return await ctx.model.Equipment.findAll({
            include: [{
                model: ctx.model.EquipmentImage
            }],
            where: { username: username }
        })
    }
}

module.exports = EquipmentService;