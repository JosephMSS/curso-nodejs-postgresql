'use strict';
const { USER_TABLE } = require('../models/user.model');
const { DataTypes } = require('sequelize');
const COLUMN_NAME = 'recovery_token';
module.exports = {
  async up(queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.addColumn(USER_TABLE, COLUMN_NAME, {
      field: 'recovery_token',
      allowNull: true,
      type: DataTypes.STRING,
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.removeColumn(USER_TABLE, COLUMN_NAME);
  },
};
