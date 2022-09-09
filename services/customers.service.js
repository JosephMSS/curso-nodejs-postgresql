const boom = require('@hapi/boom');
const {
  sequelize: { models },
} = require('../libs/sequelize');
/**
 * Maneja la lógica del CRUD de Customers
 *
 */
class CustomerService {
  constructor({ deleteUserPassword, userWithPasswordHash }) {
    this.userWithPasswordHash = userWithPasswordHash;
    this.deleteUserPassword = deleteUserPassword;
  }
  /**
   *
   * @returns un customer con la información
   * del usuario correspondiente
   * **sin exponer la contraseña**
   */
  async find() {
    const rta = await models.Customer.findAll({
      include: [{ association: 'user', attributes: { exclude: ['password'] } }],
    });
    return rta;
  }
  /**
   * Busca un customer por su id
   * @param {string} id
   * @returns {Customer}  retorna un Customer y las ordenes asociadas
   */
  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: ['orders'],
    });
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }
  /**
   * @typedef {Object} Customer
   * @property {String} name
   * @property {String} lastName
   * @property {String} phone
   * @property {User} user
   */
  /**
   *Crea el Customer junto a un usuario
   * @param {Customer} data
   * @returns retorna un Customer y un
   * usuario( sin contraseña y si el
   * rol no esta definido por
   * default va a ser
   * **customer**)
   */
  async create(data) {
    /**
     * Encriptamos la contraseña del usuario por medidas de seguridad
     */
    const { user } = data;
    const { userWithPasswordHash } = await this.userWithPasswordHash(user);
    /**
     * Modificamos el usuario que posee el customer
     */
    const customerWithUserData = { ...data, user: userWithPasswordHash };
    /**
     * Empleamos el include para anidar la
     * creacion de un usuario al momento
     * de crear un customer
     */
    const newCustomer = await models.Customer.create(customerWithUserData, {
      include: ['user'],
    });
    /**
     * Eliminamos la contraseña de la respuesta al cliente
     */
    const userData = newCustomer.dataValues.user.dataValues;
    const { userWithoutPassword } = this.deleteUserPassword(userData);
    /**
     * Aquí ya no podemos usar el spread operator
     * por que ese solo clona el primer nivel del objeto
     */
    newCustomer.dataValues.user.dataValues = userWithoutPassword;
    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}

module.exports = CustomerService;
