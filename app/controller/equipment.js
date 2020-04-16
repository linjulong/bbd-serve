'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');

class EquipmentController extends Controller {
    async create() {
        const { ctx } = this;
        // 获取文件流
        //{ autoFields: true }:可以将除了文件的其它字段提取到 parts 的 filed 中
        const parts = ctx.multipart({ autoFields: true });
        let part;
        let img = [];
        // parts() 返回 promise 对象
        while ((part = await parts()) != null) {
            let length = 0;
            if (part.length) {
                length = part[1];
                // console.log('field: ' + part[0]);
                // console.log('value: ' + part[1]);
                // console.log('valueTruncated: ' + part[2]);
                // console.log('fieldnameTruncated: ' + part[3]);
                // 获取其他参数
            } else {
                if (!part.filename) return
                // 处理文件流
                let file = {};
                let time = Date.now();
                file.name = part.filename;
                file.type = part.mimeType;
                let filePath = path.join(this.config.equipment, time + part.filename); // 保存地址
                let writable = fs.createWriteStream(filePath); // 创建写入流
                await part.pipe(writable); // 开始写入
                file.path = "http://" + this.app.config.cluster.listen.hostname + ":" +
                    this.app.config.cluster.listen.port + this.config.static.prefix +
                    'images/equipment/' + time + part.filename;
                img.push(file);
            }
        }

        try {
            ctx.validate({
                content: 'content', // 自定义的校验规则
                price: 'price', // 自带的校验规则
                tag: 'tag', // 性别是men或者women
                username: 'username',
                district: 'district'
            }, parts.field);
        } catch (error) {
            ctx.status = 422;
            ctx.body = {
                error
            }
            return;
        }

        parts.field.create_stamp = new Date().getTime();

        let data = (await ctx.service.equipment.create(parts.field)).get({ plain: true });

        let imgArr = [];
        img.forEach(item => {
            let obj = {};
            obj.img_url = item.path;
            obj.equipment_id = data.equipment_id;
            imgArr.push(obj);
        })

        await ctx.service.equipment.createImg(imgArr);

        ctx.status = 201;
        ctx.body = {
            msg: 'ok'
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
        const equipment_id = ctx.params.id;
        let equipment = await ctx.service.equipment.show(equipment_id);
        ctx.status = 200;
        ctx.body = {
            equipment
        }
    }
    async index() {
        const { ctx } = this;
        const { page, district } = ctx.request.query;
        let equipment = await ctx.service.equipment.index(page, district);
        ctx.status = 200;
        ctx.body = {
            equipment: equipment.rows,
            count: equipment.count
        }
    }
    async new() {
        const { ctx } = this;
        ctx.body = '创建页面';
    }
    async edit() {
        const { ctx } = this;
        ctx.body = '修改页面';
    }

    async showEquipmentByUsers() {
        const { ctx } = this;
        const username = ctx.request.query.username;

        const equipment = await ctx.service.equipment.showEquipmentByUsers(username);
        ctx.status = 200;
        ctx.body = {
            equipment
        }
    }
}

module.exports = EquipmentController;