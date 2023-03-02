"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      brand_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      product_name: DataTypes.STRING,
      size: DataTypes.STRING,
      weight: DataTypes.STRING,
      material: DataTypes.STRING,
      country: DataTypes.STRING,
      price: DataTypes.INTEGER,
      status: DataTypes.STRING,
      descripton: DataTypes.TEXT,
      capacity: DataTypes.STRING,
      wattage: DataTypes.STRING,
      url: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
