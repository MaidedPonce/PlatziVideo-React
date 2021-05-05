const boom = require('@hapi/boom')
const joi = require('@hapi/joi')

function validate (data, schema) {
  /** vamos a obtener un error en caso que el schema no sea valido con la data y */
  const { error } = joi.object(schema).validate(data)
  return error
}

const validationHandler = (schema, check = 'body') => {
  return (req, res, next) => {
    const error = validate(req[check], schema)

    error ? next(boom.badRequest(error)) : next()
  }
}

/** const validate = (data, schema) => {
  const { error } = joi.object(schema).validate(data)

  return error
} */

module.exports = validationHandler
