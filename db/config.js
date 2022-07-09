const { config: { db: { user, password, engine, host, name, port } } } = require("./../config")
const USER = encodeURIComponent(user)
const PASSWORD = encodeURIComponent(password)
module.exports = {
  "development": {
    "username": USER,
    "password": PASSWORD,
    "database": name,
    "host": host,
    "dialect": engine
  },
  "test": {
    "username": USER,
    "password": PASSWORD,
    "database": name,
    "host": host,
    "dialect": engine
  },
  "production": {
    "username": USER,
    "password": PASSWORD,
    "database": name,
    "host": host,
    "dialect": engine
  }
}
