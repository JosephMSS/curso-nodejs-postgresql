const express = require('express');
const passport = require('passport');
const OrdersService = require('../services/order.service');

const router = express.Router();
const service = new OrdersService();
/**
 * El nombre de la estrategia se define el archivo
 * que se registro la strategy
 */
const STRATEGY_NAME = 'jwtStrategy';

/**
 * @typedef  strategyConfig
 * @property {Boolean} session funciona para activar o desactivar el manejo se sesiones con passport
 */
/**
 * @type {strategyConfig}
 */
const strategyConfig = { session: false };
router.get(
  '/my-orders',
  passport.authenticate(STRATEGY_NAME, strategyConfig),
  async (req, res, next) => {
    try {
      const { user } = req;
      const orderList = await service.findByUser(user.sub);
      res.json(orderList);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await service.findOne(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
