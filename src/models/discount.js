"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Discount.init(
    {
      title: DataTypes.STRING,
      code: DataTypes.STRING,
      percent: DataTypes.INTEGER,
      condition: DataTypes.INTEGER,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Discount",
    }
  );
  return Discount;
};
