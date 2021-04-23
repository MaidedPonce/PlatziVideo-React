const express = require('express')
const app = express()

const { config } = require('./config/index')
const moviesApi = require('./routes/movies.js')

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers.js')
const notFoundHandler = require('./utils/middleware/notFoundHandler')
/** los middlewares de error siempre tienen que ir al final de las rutas. Las rutas son firmas */
app.use(express.json())
moviesApi(app)
app.use(notFoundHandler)
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`)
})
