const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {
  config: { auth },
} = require('../config');
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
      /**
       * La variable user esta incluida en el request
       * gracias al middleware de passport,
       * incluye toda la información que
       * definamos en la estrategia
       */
      const { user } = req;
      /**
       *
       * La información que vamos a incluir en el jwt, **Nunca guardar información sensible**
       * @typedef {Object} payload
       * @property {String} sub Es el ID del usuario con el cual vamos a verificar en la BD
       * @property {String} role El que tiene nuestro usuario
       */
      /**
       * @type {payload}
       */
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const token = jwt.sign(payload, auth.jwtSecret);

      res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
