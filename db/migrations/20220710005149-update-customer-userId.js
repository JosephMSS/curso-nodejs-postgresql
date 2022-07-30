'use strict';
const { CUSTOMER_TABLE } = require('../models/customer.model');
const COLUMN_NAME = "user_id"
const { DataTypes, } = require("sequelize")

module.exports = {
  async up(queryInterface,) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, COLUMN_NAME, {
      field: 'user_id',
      allowNull: true,
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, COLUMN_NAME, {
      field: 'user_id',
      allowNull: true,
      type: DataTypes.INTEGER,
    });
  }
};
