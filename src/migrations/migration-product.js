"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      brand_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      product_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.STRING,
      },
      weight: {
        type: Sequelize.STRING,
      },
      material: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      descripton: {
        type: Sequelize.TEXT,
      },
      capacity: {
        type: Sequelize.STRING,
      },
      wattage: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
