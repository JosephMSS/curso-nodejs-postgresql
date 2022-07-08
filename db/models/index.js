const { User, UserSchema } = require('./user.model')
/**
 * Se encarga de enviar la conexion a los modelos
 * @param sequelize conexion a la base de datos
 */
function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
}
module.exports = { setupModels, };
