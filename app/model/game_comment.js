module.exports = app => {
    const { STRING, INTEGER, FLOAT, DATE } = app.Sequelize;
    const GameComment = app.model.define('game_comment', {
        game_comment_id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, comment: "id" },
        game_id: { type: INTEGER, allowNull: false, unique: 'game_comment_unique', comment: "赛事id" },
        rate_id: { type: STRING(16), unique: 'game_comment_unique', comment: "账号" },
        be_rate_id: { type: STRING(16), unique: 'game_comment_unique', comment: "账号" },
        content: { type: STRING, allowNull: false, comment: "评语" },
        rate: { type: FLOAT(11, 1), allowNull: false, comment: "评分" },
        rate_time: { type: DATE, allowNull: false, comment: "评论时间" }
    });
    GameComment.associate = function() {
        app.model.GameComment.belongsTo(app.model.Game, { foreignKey: 'game_id', targetKey: 'game_id' });
        app.model.GameComment.belongsTo(app.model.User, { foreignKey: 'rate_id', targetKey: 'username' });
    }
    return GameComment;
};