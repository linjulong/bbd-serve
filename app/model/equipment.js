module.exports = app => {
    const { STRING, DECIMAL, INTEGER, BIGINT, TEXT } = app.Sequelize;
    const Equipment = app.model.define('equipment', {
        equipment_id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, comment: "id" },
        content: { type: TEXT, allowNull: false, comment: "正文" },
        price: { type: DECIMAL(10, 2), allowNull: false, comment: "价钱" },
        tag: { type: STRING, allowNull: false, comment: "标签" },
        district: { type: STRING(30), allowNull: false, comment: "地区" },
        username: { type: STRING(16), allowNull: false, primaryKey: true, comment: "发布者账号" },
        create_stamp: { type: BIGINT(14), allowNull: false, comment: "创立时间" }
    });
    Equipment.associate = function () {
        app.model.Equipment.hasMany(app.model.EquipmentImage, { foreignKey: 'equipment_id', targetKey: 'equipment_id' });
        app.model.Equipment.belongsTo(app.model.User, { foreignKey: 'username', targetKey: 'username' });
    }
    return Equipment;
};