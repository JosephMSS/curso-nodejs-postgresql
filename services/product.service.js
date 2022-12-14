const boom = require('@hapi/boom');
const {
  sequelize: { models },
} = require('../libs/sequelize');
const { Op } = require('sequelize');
class ProductsService {
  constructor() {
    this.products = [];
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find({ query }) {
    const config = { include: 'category', where: {} };
    const { limit, offset, price, price_min, price_max } = query;
    if (limit && offset) {
      config.limit = Number(limit);
      config.offset = Number(offset);
    }
    if (price) {
      config.where.price = price;
    }
    if (price_min && price_max) {
      config.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }
    const data = await models.Product.findAll(config);
    return data;
  }

  async findOne(id) {
    const product = models.Product.findByPk(id, {
      include: 'category',
    });
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
