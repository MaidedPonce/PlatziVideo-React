const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const boom = require('@hapi/boom')

const UsersService = require('../../../services/users')
const { config } = require('../../../config/index')

passport.use(
  new Strategy({
    secretOrKey: config.authJwtSecret,
    // de dónde vamos a sacar nuestro jwt, le diremos que lo vamos a sacar del header. Cuando hagamos una peticion donde queramos enviar nuestro jwt, lo que debemos de hacer es enviarlo en  el header como un bearer token
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  // va a recibir el payload del token ya decodificado y el cb que si encontramos el usuario o si devuelve un error
  async function (tokenPayload, cb) {
    const usersService = new UsersService()
    try {
      const user = await usersService.getUsers({ email: tokenPayload.email })

      if (!user) {
        return cb(boom.unauthorized(), false)
      }

      delete user.password
      // devolver el usuario y el atributo scopes que ya debe de venir desde el token que se debió haber firmado
      cb(null, { ...user, scopes: tokenPayload.scopes })
    } catch (error) {
      return cb(error)
    }
  })
)
