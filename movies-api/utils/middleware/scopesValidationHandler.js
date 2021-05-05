const boom = require('@hapi/boom')

// va a recibir los scoopes permitidos para la rutas, pero va a devolver un middleware porque necesitamos intervenir el request y el response de cada una de nuestras rutas
function scopesValidationHandler (allowedScopes) {
  return function (req, res, next) {
    // si el usuario que deberia venir en el obj request existe, y si existe entonces queremos validar si el usuario tiene los scopes
    if (!req.user || (req.user && !req.user.scopes)) {
      next(boom.unauthorized('Missing arguments'))
    }
    const hasAccess = allowedScopes.map(allowedScopes => req.user.scopes.includes(allowedScopes))
      .find(allowed => Boolean(allowed))

    if (hasAccess) {
      next()
    } else {
      next(boom.unauthorized('Insuffiecient scopes'))
    }
  }
}

module.exports = scopesValidationHandler
