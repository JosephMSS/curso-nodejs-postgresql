const { compare } = require('bcrypt');
const { PassHash } = require('./pass-hash');
/**
 * El segundo argumento es la cantidad de veces que queremos encriptar un parámetro
 */
class PassVerify {
  /**
   * @typedef {Object} isValid
   * @property {Boolean} isValid
   */
  /**
   * Compara la contrasena con el has
   * @param {String} password Contraseña del usuario
   * @param {String} hash hash encriptado
   * @returns {isValid} El hash de la contraseña
   */
  static async verifyPassword(password, hash) {
    const isValid = await compare(password, hash);
    return { isValid };
  }
}
async function validateInfo() {
  const validPassword = '1234';
  const invalidPassword = '1234asdf asdf';
  const hash = await PassHash.getHash(validPassword);
  const { isValid } = await PassVerify.verifyPassword(validPassword, hash);
  console.log(
    '🚀 ~ file: pass-verify.js ~ line 22 ~ validateInfo ~ isValid',
    isValid
  );
  const { isValid: notValid } = await PassVerify.verifyPassword(
    invalidPassword,
    hash
  );
  console.log(
    '🚀 ~ file: pass-verify.js ~ line 24 ~ validateInfo ~ notValid',
    notValid
  );
}
validateInfo();
