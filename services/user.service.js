const boom = require('@hapi/boom');
const { custom } = require('joi');
const { sequelize: { models } } = require('../libs/sequelize');
class UserService {
  constructor() { }

  async create(data) {
    const res = await models.User.create(data)
    return res
  }

  async find() {
    const res = await models.User.findAll({ include: ["customer"] })
    return res
  }

  async findOne(id) {
    const user = await models.User.findByPk(id)
    if (!user) {
      throw boom.notFound("user not Found")
    }
    return user
  }

  async update(id, changes) {
    const user = await this.findOne(id)
    const res = await user.update(changes)
    return res
  }

  async delete(id) {
    const user = await this.findOne(id)
    const res = await user.destroy()
    return id
  }
}

module.exports = UserService;
