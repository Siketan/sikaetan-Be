"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Footer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Footer.init(
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Footer",
    }
  );
  return Footer;
};