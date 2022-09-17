const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const { compare } = require('bcrypt');
const UserService = require('./user.service');
const service = new UserService();
const {
  config: { auth },
} = require('../config');
class AuthService {
  constructor() {}
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    /**
     * Si el usuario no existe entonces retorna un 401
     */
    if (!user) {
      throw boom.unauthorized();
    }
    const hash = user.password;
    const isMatch = await compare(password, hash);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    /**
     * Si es valido retorno la información del usuario
     */
    const { userWithoutPassword } = UserService.deleteUserPassword(
      user.dataValues
    );
    return userWithoutPassword;
  }
  signToken(user) {
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
    return token;
  }
  sendMail() {}
}
module.exports = { AuthService };
