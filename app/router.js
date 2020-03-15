'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, io } = app;
    router.post('/base/login', controller.base.login);
    router.post('/base/register', controller.base.register);
    router.post('/user/avatar', controller.user.uploadAvatar);
    router.put('/user/checkReset', controller.user.checkReset);
    router.get('/user/game/show', controller.user.gameShow); //获取个人的全部比赛
    router.get('/user/games/show', controller.user.gamesShow); //聊天页面获取未开始比赛
    router.get('/user/updateChatListUser', controller.user.updateChatListUser); //获取聊天列表用户信息
    router.get('/equipment/all', controller.equipment.showEquipmentByUsers);
    router.put('/user/reset', controller.user.reset);
    router.post('/game/join', controller.game.join);

    router.resources('game', '/game', controller.game);
    router.resources('user', '/user', controller.user);
    router.resources('concern', '/concern', controller.concern);
    router.resources('equipment', '/equipment', controller.equipment);
    router.resources('comment', '/comment', controller.comment);


    //socket.io
    // app.io.of('/')
    io.route('chat', app.io.controller.chat.index);
    io.route('comment', app.io.controller.comment.index);
    io.route('verify', app.io.controller.game.verify);
    io.route('gameNotiy', app.io.controller.game.notiy);
    //io.of('/').route('server', io.controller.home.server);
};