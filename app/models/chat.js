'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.dataPerson, { through: 'chatDataPerson', foreignKey: 'chatId' })
      this.hasMany(models.chatDataPerson, { foreignKey: 'chatId' })
      this.hasMany(models.message, { foreignKey: 'chatId' })
    }
  }
  chat.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'chat',
  });
  return chat;
};