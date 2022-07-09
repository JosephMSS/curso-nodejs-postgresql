'use strict';
const { USER_TABLE, UserSchema } = require('../models/user.model');
const COLUMN_NAME = "role"
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(USER_TABLE, COLUMN_NAME, UserSchema.role);
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, COLUMN_NAME);
  }
};
