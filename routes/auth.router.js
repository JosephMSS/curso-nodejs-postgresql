const express = require('express');
const passport = require('passport');
const router = express.Router();
const { AuthService } = require('../services/auth.service');
const service = new AuthService();
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
      /**
       * La variable user esta incluida en el request
       * gracias al middleware de passport,
       * incluye toda la información que
       * definamos en la estrategia
       */
      const { user } = req;
      const token = service.signToken(user);
      res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  }
);
router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await service.sendRecovery(email);
    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
