"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      role_id: DataTypes.INTEGER,
      user_name: DataTypes.STRING,
      gender: DataTypes.STRING,
      dob: DataTypes.DATE,
      phone: DataTypes.STRING(10),
      street: DataTypes.STRING,
      ward: DataTypes.STRING,
      district: DataTypes.STRING,
      city: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
