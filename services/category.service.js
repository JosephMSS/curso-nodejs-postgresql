const boom = require('@hapi/boom');
const {
  sequelize: { models },
} = require('../libs/sequelize');

class CategoryService {
  constructor() {}
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const data = await models.Category.findAll();
    return data;
  }

  async findOne(id) {
    const category =await  models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!category) {
      throw boom.notFound('category not Found');
    }
    return category;
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

module.exports = CategoryService;
