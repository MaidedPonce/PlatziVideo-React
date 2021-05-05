const express = require('express')
const helmet = require('helmet')
const app = express()

const { config } = require('./config/index')

const authApi = require('./routes/auth')
const moviesApi = require('./routes/movies.js')
const userMoviesApi = require('./routes/userMovies.js')

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers.js')
const notFoundHandler = require('./utils/middleware/notFoundHandler')
/** los middlewares de error siempre tienen que ir al final de las rutas. Las rutas son firmas */
app.use(express.json())
app.use(helmet())

authApi(app)
moviesApi(app)
userMoviesApi(app)
app.use(notFoundHandler)
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`)
})
