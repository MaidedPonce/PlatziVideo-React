const boom = require('@hapi/boom')
const { config } = require('../../config')

/** No es middleware */
function withErrorStack (error, stack) {
  /** si estoy en desarrollo me devuelve completo y si no solo va a devolver el error. '...' son agregados porque al implementar boom, entonces se agregan más cosas para validar */
  if (!config.dev) {
    return { ...error, stack }
  }
  return error
}

function logErrors (err, req, res, next) {
  console.log(err)
  next(err)
}
/** manejo al error. Normalmente estos errores se imprimen en formato html pero como estamos haciendo una API, es necesario que lo hagamos en formato json */
/** por si me llega un error que no es de tipo boom */
function wrapErrors (err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err))
  }
  next(err)
}

function errorHandler (err, req, res, next) {
  /** mensaje de mi error y el mensaje del stack */
  const { output: { statusCode, payload } } = err
  res.status(statusCode)
  res.json(withErrorStack(payload, err.stack))
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler
}
