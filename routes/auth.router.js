const express = require('express');
const passport = require('passport');

const router = express.Router();

const STRATEGY_NAME = 'localStrategy';
/**
 * @typedef  strategyConfig
 * @property {Boolean} session funciona para activar o desactivar el manejo se sesiones con passport
 */
/**
 * @type {strategyConfig}
 */
const strategyConfig = { session: false };
/**
 * En este caso no se utiliza un middleware
 * de schemas ya que passport lo maneja a
 * nivel interno
 */
router.post(
  '/login',
  passport.authenticate(STRATEGY_NAME, strategyConfig),
  async (req, res, next) => {
    try {
      const { user } = req;
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
