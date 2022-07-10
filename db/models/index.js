const { User, UserSchema } = require('./user.model')
const { Customer, CustomerSchema } = require('./customer.model')
/**
 * Se encarga de enviar la conexion a los modelos
 * @param sequelize conexion a la base de datos
 */
function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))
  /**
   * Luego de ejecutar los inits vamos a generar las asociaciones

   */
  User.associate(sequelize.models)
  Customer.associate(sequelize.models)
}
module.exports = { setupModels, };
