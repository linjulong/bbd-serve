'use strict';

const Controller = require('egg').Controller;

class GameController extends Controller {
    async create() {
        const { ctx } = this;

        try {
            ctx.validate({
                game_time: "game_time",
                cityname: "cityname",
                orientation: "orientation"
            });
        } catch (error) {
            ctx.status = 422;
            ctx.body = {
                error
            }
            return;
        }


        const lat = ctx.request.body.lat;
        const lng = ctx.request.body.lng;
        const result = await ctx.curl(`https://apis.map.qq.com/ws/geocoder/v1/?location=${lat},${lng}&key=RCDBZ-ALJKJ-HNIFV-KB4ZJ-CJOW6-2XFEX`, {
            dataType: 'json'
        });

        ctx.request.body.district = result.data.result.ad_info.district;

        //ctx.request.body.game_time = ctx.helper.sillyDatetime(ctx.request.body.game_time);
        ctx.request.body.game_time = new Date(ctx.request.body.game_time).getTime();
        ctx.request.body.create_time = ctx.helper.sillyToday();
        ctx.request.body.create_stamp = new Date().getTime();

        let game = await ctx.service.game.create(ctx.request.body);
        let game_id = JSON.parse(JSON.stringify(game)).game_id;

        ctx.request.body.teamInfoArr.forEach(item => {
            item.game_id = game_id;
        })

        await ctx.service.game.createGameAthletes(ctx.request.body.teamInfoArr);

        ctx.status = 201;
        ctx.body = {
            msg: '新增成功'
        }
    }
    async join() {
        const { ctx } = this;
        const data = ctx.request.body;
        //加入比赛前先去判断名额是否满了
        try {
            await ctx.service.game.join(data);
        } catch (error) {
            ctx.status = 200;
            ctx.body = {
                msg: error.name,
                code: 0
            };
            return;
        }
        ctx.status = 201;
        ctx.body = {
            msg: 'ok',
            code: 1
        };
    }
    async destroy() {
        const { ctx } = this;
        await ctx.service.game.delete(ctx.params.id);
        ctx.status = 204;
        ctx.body = {
            msg: 'ok'
        };
    }
    async update() {
        const { ctx } = this;
        const username = ctx.request.query.username;
        const game_id = ctx.params.id;
        await ctx.service.game.exitGame(game_id, username);

        ctx.status = 204;
        ctx.body = {
            msg: 'ok'
        };
    }
    async show() {
        const { ctx } = this;
        const game_id = ctx.params.id;
        const game = await ctx.service.game.findByPk(game_id);
        ctx.status = 200;
        ctx.body = {
            msg: 'ok',
            game
        }
    }
    async index() {
        const { ctx } = this;
        const page = parseInt(ctx.request.query.page);
        const duration = parseFloat(ctx.request.query.duration);
        const rate = parseFloat(ctx.request.query.rate);
        let chargeable;
        if (ctx.request.query.chargeable != '全部') {
            chargeable = ctx.request.query.chargeable == 'true' ? true : false;
        } else {
            chargeable = ctx.request.query.chargeable;
        }
        const { district, game_type, game_part, orientation, keyword } = ctx.request.query;
        const games = await ctx.service.game.index(page, district, game_type, duration, game_part, orientation, rate, chargeable, keyword);
        games.rows = JSON.parse(JSON.stringify(games.rows));
        games.rows.forEach(item => {
            item.game_time = ctx.helper.sillyDatetime(item.game_time);
            item.game_time_future = ctx.helper.sillyFuture(item.game_time);
        })
        ctx.status = 200;
        ctx.body = games;
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

module.exports = GameController;