"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      order_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(50),
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      discount_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      subtotal_price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      total_price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      payment_method: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ward: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      district: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      receiver: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING(10),
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
    await queryInterface.dropTable("Orders");
  },
};
