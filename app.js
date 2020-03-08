// app.js
const path = require('path');
const { user, game, game_athletes, equipment_image, equipment, comments } = require('./data');
module.exports = app => {
    // 自定义内容
    // 加载所有的校验规则
    const directory = path.join(app.config.baseDir, 'app/validate');
    app.loader.loadToApp(directory, 'validate');

    app.beforeStart(async() => {
        // 应用会等待这个函数执行完成才启动
        console.log("生成模型和插入数据中");
        //根据定义好的model去数据库生成相应的表 force为ture则会删除已经存在表的数据
        await app.model.sync({ force: true });
        await app.model.User.bulkCreate(user);
        await app.model.Game.bulkCreate(game);
        await app.model.GameAthletes.bulkCreate(game_athletes);
        await app.model.Equipment.bulkCreate(equipment);
        await app.model.EquipmentImage.bulkCreate(equipment_image);
        await app.model.GameComment.bulkCreate(comments);
        console.log("生成模型和插入数据成功");
    });

    app.ready(async() => {
        console.log("==app ready==");
    })

    app.beforeClose(async() => {
        console.log("==app beforeClose==");
    })
    app.once('server', server => { // 该事件一个 worker 进程只会触发一次，在 HTTP 服务完成启动后，会将 HTTP server 通过这个事件暴露出来给开发者
        // websocket
    });
    app.on('error', (err, ctx) => { //运行时有任何的异常被 onerror 插件捕获后，都会触发 error 事件，将错误对象和关联的上下文（如果有）暴露给开发者，可以进行自定义的日志记录上报等处理。
        // report error
        //console.log(err)
    });
    app.on('request', ctx => { //应用收到请求和响应请求时，分别会触发 request 和 response 事件，并将当前请求上下文暴露出来，开发者可以监听这两个事件来进行日志记录
        // log receive request

    });
    app.on('response', ctx => {
        // ctx.starttime is set by framework
        // log total cost
    });
};