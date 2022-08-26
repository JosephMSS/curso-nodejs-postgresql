const boom = require('@hapi/boom');
const {
  sequelize: { models },
} = require('../libs/sequelize');
class OrderService {
  constructor() {}
  async create(data) {
    const order = await models.Order.create(data);
    return order;
  }

  async find() {
    const orderList = await models.Order.findAll();
    return orderList;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: {
        association: 'customer',
        include: 'user',
      },
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = OrderService;
