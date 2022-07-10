'use strict';
const { CUSTOMER_TABLE } = require('../models/customer.model');
const COLUMN_NAME = "user_id"
const { DataTypes, } = require("sequelize")

module.exports = {
  async up(queryInterface,) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn(CUSTOMER_TABLE, COLUMN_NAME, {
      field: 'user_id',
      allowNull: true,
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn(CUSTOMER_TABLE, COLUMN_NAME, {
      field: 'user_id',
      allowNull: true,
      type: DataTypes.INTEGER,
    });
  }
};
