module.exports = app => {
    const { STRING, INTEGER, FLOAT } = app.Sequelize;
    const User = app.model.define('user', {
        username: { type: STRING(16), allowNull: false, primaryKey: true, comment: "账号" },
        password: { type: STRING(18), allowNull: false, comment: "密码" },
        phone: { type: STRING(13), allowNull: false, unqiue: true, comment: "电话" },
        nickname: { type: STRING(10), allowNull: false, defaultValue: '蔡徐坤', comment: "昵称" },
        avatar: { type: STRING(200), allowNull: false, comment: "头像" },
        orientation: { type: STRING(50), comment: "位置" },
        stature: { type: INTEGER(3), comment: "身高" },
        weight: { type: INTEGER(3), comment: "体重" },
        tag: { type: STRING(20), comment: "标签" },
        motto: { type: STRING(200), comment: "座右铭" },
        credit: { type: INTEGER(3), defaultValue: 70, comment: "信用", validate: { max: 100, min: 0 } },
        //rate: { type: FLOAT(11, 1), defaultValue: 0, comment: "评分" }
    });
    User.associate = function () {
        app.model.User.hasMany(app.model.Game, { foreignKey: 'username', targetKey: 'username' });
        app.model.User.hasMany(app.model.Equipment, { foreignKey: 'username', targetKey: 'username' });
        app.model.User.hasMany(app.model.Concern, { foreignKey: 'username', targetKey: 'username' });
        app.model.User.hasMany(app.model.Concern, { foreignKey: 'username', targetKey: 'concern_id' });
        app.model.User.hasMany(app.model.GameComment, { foreignKey: 'be_rate_id', targetKey: 'rate_id' });
    }
    return User;
};