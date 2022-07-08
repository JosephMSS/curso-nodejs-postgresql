const { Model, DataTypes, Sequelize } = require("sequelize")
const USER_TABLE = 'users'
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}
/**
 * Los metodos estaticos no necesitan una declaracion del objeto para utilizarlos
 */
class User extends Model {
  /**
   * En este metodo definimos todas las relaciones que va a tener este modelo
   */
  static associate() {
    //models
  }
  /**
   *
   * @param sequelize conexion con la base de datos
   * @returns la configuracion estandar del modelo
   */
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}
module.exports = { USER_TABLE, UserSchema, User };
