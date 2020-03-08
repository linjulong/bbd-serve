module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
    const EquipmentImage = app.model.define('equipment_image', {
        equipment_id: { type: INTEGER, allowNull: false, comment: "id" },
        img_url: { type: STRING, allowNull: false, comment: "图片链接" }
    });
    EquipmentImage.associate = function() {
        app.model.EquipmentImage.belongsTo(app.model.Equipment, { foreignKey: 'equipment_id', targetKey: 'equipment_id' });
    }
    return EquipmentImage;
};