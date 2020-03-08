'use strict';

const Controller = require('egg').Controller;

class ConcernController extends Controller {
    async create() {
        const { ctx } = this;
        await ctx.service.concern.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = {
            msg: 'ok'
        }
    }
    async destroy() {
        const { ctx } = this;
        const username = ctx.params.id;
        const concern_id = ctx.request.query.concern_id;
        await ctx.service.concern.delete(username, concern_id);
        ctx.status = 204;
        ctx.body = {
            msg: 'ok'
        }
    }
    async update() {
        const { ctx } = this;

    }
    async show() {
        const { ctx } = this;
        const username = ctx.params.id;
        let concern = await ctx.service.concern.show(username);
        ctx.status = 200;
        ctx.body = {
            concern
        }
    }
    async index() {
        const { ctx } = this;

    }
    async new() {
        const { ctx } = this;
        ctx.body = '创建页面';
    }
    async edit() {
        const { ctx } = this;
        ctx.body = '修改页面';
    }
}

module.exports = ConcernController;