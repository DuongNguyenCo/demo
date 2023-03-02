"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      discount_id: DataTypes.INTEGER,
      subtotal_price: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      payment_method: DataTypes.STRING,
      status: DataTypes.STRING,
      street: DataTypes.STRING,
      ward: DataTypes.STRING,
      district: DataTypes.STRING,
      city: DataTypes.STRING,
      receiver: DataTypes.STRING,
      phone: DataTypes.STRING(10),
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
