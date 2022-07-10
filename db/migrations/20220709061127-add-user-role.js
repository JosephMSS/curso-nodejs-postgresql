'use strict';
const { USER_TABLE } = require('../models/user.model');
const { DataTypes } = require("sequelize")

const COLUMN_NAME = "role"
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(USER_TABLE, COLUMN_NAME,
      {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'customer'
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, COLUMN_NAME);
  }
};
