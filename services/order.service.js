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
  async addItem(data) {
    const item = await models.OrderProduct.create(data);
    return item;
  }

  async find() {
    const orderList = await models.Order.findAll();
    return orderList;
  }
  /**
   *
   * @param {String} userId
   * @returns
   */
  async findByUser(userId) {
    /**
     * Podemos hacer consultas complejas a traves de
     * las relaciones,**Importante**:
     * debe e iniciar con el
     * símbolo de dólar
     */
    const where = {
      '$customer.user.id$': userId,
    };
    const orderList = await models.Order.findAll({
      where,
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
    return orderList;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
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
