'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
    async create() {
        const { ctx } = this;

        try {
            for (var i = 0; i < ctx.request.body.length; i++) {
                ctx.validate({
                    game_id: "game_id",
                    rate_id: "rate_id",
                    be_rate_id: "be_rate_id",
                    content: "content"
                }, ctx.request.body[i]);
            }

        } catch (error) {
            ctx.status = 422;
            ctx.body = {
                error
            }
            return;
        }

        try {
            await ctx.service.comment.create(ctx.request.body);
            //添加信用评分
            for (var i = 0; i < ctx.request.body.length; i++) {
                await ctx.service.user.addCredit(ctx.request.body[i].be_rate_id);
            }
        } catch (error) {
            console.log(error)
            ctx.status = 403;
            ctx.body = {
                error
            }
            return;
        }


        ctx.status = 201;
        ctx.body = {
            msg: '新增成功'
        }
    }
    async destroy() {
        const { ctx } = this;

    }
    async update() {
        const { ctx } = this;

    }
    async show() {
        const { ctx } = this;
        const username = ctx.params.id;
        const comments = await ctx.service.comment.show(username);

        ctx.status = 200;
        ctx.body = {
            msg: '查询成功',
            comments
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

module.exports = CommentController;