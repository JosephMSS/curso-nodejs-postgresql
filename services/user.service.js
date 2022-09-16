const boom = require('@hapi/boom');
const {
  sequelize: { models },
} = require('../libs/sequelize');
const { hash } = require('bcrypt');
/**
 * Maneja la lógica del CRUD de usuarios
 */
class UserService {
  constructor() {}
  /**
   * @typedef {Object} User
   * @property {String}email
   * @property {String}password
   * @property {String}role
   */
  /**
   * se elimina la contraseña de la respuesta como medida de seguridad
   * @param {User} user
   * @returns {User} Retorna el nuevo usuario sin la contraseña
   */
  static deleteUserPassword(user) {
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    return { userWithoutPassword };
  }
  /**
   * se elimina la contraseña de la respuesta como medida de seguridad
   * @param {User} user
   * @returns {User} Retorna el nuevo usuario sin la contraseña
   */
  static async userWithPasswordHash(user) {
    const userData = { ...user };
    const passwordHash = await hash(userData.password, 10);
    const userWithPasswordHash = { ...userData, password: passwordHash };
    return { userWithPasswordHash };
  }
  /**
   * Se generar el hash de la contraseña
   * @param {User} data Informacion del usuario
   * @returns {String} El hash de la contraseña
   */
  async create(data) {
    const { userWithPasswordHash } = await UserService.userWithPasswordHash(
      data
    );
    const newUser = await models.User.create(userWithPasswordHash);
    /**
     * Se utiliza el .dataValues, debido a que
     * estamos usando **sequelize** y allí
     * es donde se almacena la
     * información del usuario
     */
    const userData = newUser.dataValues;
    const { userWithoutPassword } = UserService.deleteUserPassword(userData);
    return userWithoutPassword;
  }

  async findByEmail(email) {
    const res = await models.User.findOne({
      where: {
        email,
      },
    });
    return res;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not Found');
    }
    return user;
  }
  async find() {
    const userList = await models.User.findAll();
    return userList;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const res = await user.update(changes);
    return res;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return id;
  }
}

module.exports = UserService;
