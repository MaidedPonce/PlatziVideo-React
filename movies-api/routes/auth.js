const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const ApiKeysService = require('../services/apiKeys')
const UsersService = require('../services/users')
const validationHandler = require('../utils/middleware/validationHandler')
const { createUserSchema, createProviderUserSchema } = require('../utils/schemas/users')

const { config } = require('../config/index')

// Basic strategy
require('../utils/auth/strategies/basic')

function authApi (app) {
  const router = express.Router()
  app.use('/api/auth', router)

  const apiKeyService = new ApiKeysService()
  const usersServices = new UsersService()
  router.post('/sign-in', async function (req, res, next) {
    // verificar que del cuerpo venga un atributo que se llame apiKeyToken. Ese es el token que le vamos a pasar al sign in para determinar que clase de permisos vamos a firmar en el json webtoken que vamos a devolver
    const { apiKeyToken } = req.body
    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'), false)
    }
    passport.authenticate('basic', function (error, user) {
      try {
        if (error || !user) {
          next(boom.unauthorized(), false)
        }
        // si no hay un error y exoste el usuario, entonces hacemos login. Definimos que no implementamos una sesión, vamos a tratar de no manejar estado de sesion, entonces debemos de ser explicitos
        req.login(user, { session: false }, async function (error) {
          if (error) {
            next(error)
          }
          // le pasamos el token que va a venir de nuestro cuerpo como apiToken y debemos vereficar que si no existe, me devuelva un error 'unauthorized'
          const apiKey = await apiKeyService.getApiKey({ token: apiKeyToken })
          if (!apiKey) {
            next(boom.unauthorized())
          }
          // construir el jwt. Sacamos el id del usuario, el nombre e email
          const { _id: id, name, email } = user
          // construimos un payload que irá en nuestro token
          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes
          }
          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m'
          })
          return res.status(200).json({ token, user: { id, name, email } })
        })
      } catch (error) {
        next(error)
      } // closure con la firma de la ruta. Nuestro authenticate y custom callbacks funcionen bien
    })(req, res, next)
  })

  router.post('/sign-up', validationHandler(createUserSchema), async function (req, res, next) {
    const { body: user } = req
    try {
      const createUserId = await usersServices.createUser({ user })

      res.status(201).json({
        data: createUserId,
        message: 'user created'
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/sign-provider', validationHandler(createProviderUserSchema), async function (req, res, next) {
    const { body } = req
    const { apiKeyToken, ...user } = body

    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'))
    }

    try {
      const queryUser = await usersServices.getOrCreateUser({ user })
      const apiKey = await apiKeyService.getApiKey({ token: apiKeyToken })

      if (!apiKey) {
        next(boom.unauthorized())

        const { _id: id, name, email } = queryUser

        const payload = {
          sub: id,
          name,
          email,
          scopes: apiKey.scopes
        }

        const token = jwt.sign(payload, config.authJwtSecret, {
          expiresIn: '15m'
        })
        return res.status(200).json({ token, user: { id, name, email } })
      }
    } catch (error) {
      next(error)
    }
  })
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['email', 'profile', 'openid']
    })
  )

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false }),
    function (req, res, next) {
      if (!req.user) {
        next(boom.unauthorized())
      }

      const { token, ...user } = req.user

      res.cookie('token', token, {
        httpOnly: !config.dev,
        secure: !config.dev
      })

      res.status(200).json(user)
    }
  )

  app.get('/auth/facebook', passport.authenticate('facebook'), {
    scope: ['email', 'profile', 'openid']
  })

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { session: false }),
    function (req, res, next) {
      if (!req.user) {
        next(boom.unauthorized())
      }

      const { token, ...user } = req.user

      res.cookie('token', token, {
        httpOnly: !config.dev,
        secure: !config.dev
      })

      res.status(200).json(user)
    }
  )
}

module.exports = authApi
