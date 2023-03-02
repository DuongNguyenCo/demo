"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BrandCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BrandCategory.init(
    {
      brand_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BrandCategory",
    }
  );
  return BrandCategory;
};
