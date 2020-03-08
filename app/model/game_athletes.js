module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
    const GameAthletes = app.model.define('game_athletes', {
        game_id: { type: INTEGER, allowNull: false, unique: 'game_athletes_unique', comment: "赛事id" },
        username: { type: STRING(16), unique: 'game_athletes_unique', comment: "账号" }
    });
    GameAthletes.associate = function() {
        app.model.GameAthletes.belongsTo(app.model.Game, { foreignKey: 'game_id', targetKey: 'game_id' });
        app.model.GameAthletes.belongsTo(app.model.User, { foreignKey: 'username', targetKey: 'username' });
    }
    return GameAthletes;
};