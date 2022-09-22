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
  /**
   * 1. Busca el usuario por email y lo valida,
   * 2. Crea un token con 15 minutos de expiración,
   * 3. Guarda ese token en la base de datos
   * 4. Crea el el contenido del email
   * para la información el método
   * sentEmail y retorna la
   * respuesta
   * @param {String} email
   * @returns
   */
  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    /**
     * Si el usuario no existe entonces retorna un 401
     */
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.id,
    };
    /**
     * IMPORTANT: El secret de recovery puede ser uno diferente al de
     *  autenticación para mayor seguridad
     */
    const recoveryToken = jwt.sign(payload, auth.jwtSecret, {
      expiresIn: '15min',
    });
    /**
     * Usualmente el token de seguridad debe mandarse como
     * **query param** al frontend para que este lo pueda enviar luego
     */
    await service.update(user.id, {
      recoveryToken,
    });
    const link = `http://myfrontend.com:?token=${recoveryToken}`;
    const infoMail = {
      from: 'joseph.demo.node@gmail.com', // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Email para recuperar la contraseña', // Subject line
      html: `<b>Ingresa a este link=>${link}</b>`, // html body
    };
    const rta = await this.sendMail(infoMail);
    return rta;
  }
  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: mail.user, // generated ethereal user
        pass: mail.password, // generated ethereal password
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'Mail Sent' };
  }
}
module.exports = { AuthService };
