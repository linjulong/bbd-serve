module.exports = app => {
    const { STRING, INTEGER, DOUBLE, DATE, BIGINT, BOOLEAN, DECIMAL, FLOAT } = app.Sequelize;
    const Game = app.model.define('game', {
        game_id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, comment: "id" },
        username: { type: STRING(16), allowNull: false, comment: "账号" },
        game_number: { type: INTEGER, allowNull: false, comment: "人数" },
        orientation: { type: STRING(50), allowNull: false, comment: "期望位置" },
        create_time: { type: DATE, allowNull: false, comment: "创立时间" },
        create_stamp: { type: BIGINT(14), allowNull: false, comment: "创立时间" },
        game_time: { type: BIGINT(14), allowNull: false, comment: "比赛时间" },
        duration: { type: DOUBLE, allowNull: false, comment: "持续时间" },
        game_type: { type: STRING(5), allowNull: false, comment: "比赛类型" },
        poiaddress: { type: STRING, allowNull: false, comment: "比赛位置" },
        cityname: { type: STRING(30), allowNull: false, comment: "比赛城市" },
        district: { type: STRING(30), allowNull: false, comment: "比赛地区" },
        lat: { type: DOUBLE, allowNull: false, comment: "经度" },
        lng: { type: DOUBLE, allowNull: false, comment: "纬度" },
        remarks: { type: STRING, comment: "备注" },
        chargeable: { type: BOOLEAN, allowNull: false, comment: "场地是否收费" },
        cost: { type: DECIMAL(10, 2), allowNull: false, comment: "场地价钱" },
        rate: { type: FLOAT(11, 1), defaultValue: 0, comment: "评分限定" },
        verify: { type: BOOLEAN, allowNull: false, comment: "申请加入审核" }
    });
    Game.associate = function () {
        app.model.Game.belongsTo(app.model.User, { foreignKey: 'username', targetKey: 'username' });
        app.model.Game.hasMany(app.model.GameAthletes, { foreignKey: 'game_id', targetKey: 'game_id' });
        app.model.Game.hasMany(app.model.GameComment, { foreignKey: 'game_id', targetKey: 'game_id' });
    }
    return Game;
};