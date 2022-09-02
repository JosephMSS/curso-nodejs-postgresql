const Joi = require('joi');
const { id: categoryId } = require('./category.schema');
const id = Joi.string();
const name = Joi.string().min(3).max(50);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const description = Joi.string().min(10);
const limit = Joi.number();
const offset = Joi.number();
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  description: description.required(),
  image: image,
});

const getProductSchema = Joi.object({
  id: id.required(),
});
const queryProductSchema = Joi.object({
  limit,
  offset,
});

module.exports = {
  queryProductSchema,
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};
