const Joi = require('joi');
const { id: categoryId } = require('./category.schema');
const id = Joi.string();
const name = Joi.string().min(3).max(50);
const price = Joi.number().integer();
const image = Joi.string().uri();
const description = Joi.string().min(10);
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();
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
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: Joi.number().integer().required(),
    then: Joi.required(),
  }),
});

module.exports = {
  queryProductSchema,
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};
