const faker = require('faker');
const boom = require('@hapi/boom');
const {
  sequelize: { models },
} = require('../libs/sequelize');
class ProductsService {
  constructor() {
    this.products = [];
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    const data = await models.Product.findAll({
      include: 'category',
    });
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
