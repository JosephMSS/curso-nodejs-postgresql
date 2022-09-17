const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const { compare } = require('bcrypt');
const UserService = require('./user.service');
const service = new UserService();
const {
  config: { auth, mail },
} = require('../config');
/**
 * Creamos la clase auth service para unificar toda la lógica
 * de autentificación que teníamos en las estrategias
 * y en el router
 */
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
  async sendMail(email) {
    const user = await service.findByEmail(email);
    /**
     * Si el usuario no existe entonces retorna un 401
     */
    if (!user) {
      throw boom.unauthorized();
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: mail.user, // generated ethereal user
        pass: mail.password, // generated ethereal password
      },
    });
      await transporter.sendMail({
      from: 'joseph.demo.node@gmail.com', // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    });
    return { message: 'Mail Sent' };
  }
}
module.exports = { AuthService };
