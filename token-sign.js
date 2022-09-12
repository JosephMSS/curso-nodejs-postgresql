const jwt = require('jsonwebtoken');
/**
 * El secret debe estar en una variable de entorno **Nunca en el código**
 */
const secret = 'mySecret';
/**
 *
 * La información que vamos a incluir en el jwt, **Nunca guardar información sensible**
 * @typedef {Object} payload
 * @property {Number} sub Es el ID del usuario con el cual vamos a verificar en la BD
 * @property {String} scope en ste caso va a ser ekl rol qe tiene nuestro usuario
 */
/**
 * @type {payload}
 */
const payload = {
  sub: 1,
  scope: 'customer',
};
/**
 * Firma el token con la informacion
 * @param {payload} payload
 * @param {String} secret
 */
function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}
/**
 *
 * @param {String} token
 * @param {String} secret
 * @returns La informacion del payload mas la fecha de la firma
 */
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}
const token = signToken(payload, secret);
const verify = verifyToken(token, secret);
console.log('🚀 ~ file: token-sign.js ~ line 33 ~ verify', verify);
