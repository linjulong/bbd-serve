module.exports = app => {
    const { STRING, INTEGER, FLOAT } = app.Sequelize;
    const Concern = app.model.define('concern', {
        username: { type: STRING(16), allowNull: false, unique: 'concern_unique', comment: "账号" },
        concern_id: { type: STRING(16), allowNull: false, unique: 'concern_unique', comment: "账号" },
        rate: { type: FLOAT(11, 1), allowNull: false, comment: "评分" }
    });
    Concern.associate = function() {
        app.model.Concern.belongsTo(app.model.User, { foreignKey: 'username', targetKey: 'username' });
        app.model.Concern.belongsTo(app.model.User, { foreignKey: 'concern_id', targetKey: 'username' });
        // app.model.Concern.belongsToMany(app.model.User, {
        //     through: {
        //         model: app.model.UserConcern,
        //         unique: false,
        //     },
        //     constraints: false
        // });
    }
    return Concern;
};