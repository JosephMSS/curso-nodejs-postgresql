const { Sequelize } = require("sequelize")
const { setupModels } = require('../db/models');
const { config: { db: { user, password, engine, host, name, port } } } = require("./../config")
const USER = encodeURIComponent(user)
const PASSWORD = encodeURIComponent(password)
const URI = `${engine}://${USER}:${PASSWORD}@${host}:${port}/${name}`
/**
 * Instancia de la conexion a la base de datos
 */
const sequelize = new Sequelize(URI, {
  dialect: `${engine}`,
  logging: true
});

setupModels(sequelize)
// sequelize.sync()
const validateConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
validateConnection()
module.exports = { sequelize };
