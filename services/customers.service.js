const boom = require('@hapi/boom');
const {
  sequelize: { models },
} = require('../libs/sequelize');

class CustomerService {
  constructor() {}
  /**
   *
   * @returns un customer con la informacion del usuarios correspondiente
   */
  async find() {
    const rta = await models.Customer.findAll({
      include: ['user'],
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id, {
      include: ['orders'],
    });
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data) {
    /**
     * Empleamos el include para anidar la
     * creacion de un usuario al momento
     * de crear un customer
     */
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}

module.exports = CustomerService;
