import express from 'express'
import dotenv from 'dotenv'
import webpack from 'webpack'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import { renderRoutes } from 'react-router-config'
import { StaticRouter } from 'react-router-dom'
import serverRoutes from '../frontend/routes/serverRoutes'
import reducer from '../frontend/reducers'
import initialState from '../frontend/initialState'

dotenv.config()

const { ENV, PORT } = process.env
const app = express()
if (ENV === 'development') {
  console.log('Development config')
  const webpackConfig = require('../../webpack.config')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(webpackConfig)
  const serverConfig = { port: PORT, hot: true }

  app.use(webpackDevMiddleware(compiler, serverConfig))
  app.use(webpackHotMiddleware(compiler))
}

// está recibiendo un html y ese mismo lo vamos a insertar en medio de donde colocamos nuestro entrypoint para que nuestra app del frontend entre
const setResponse = (html, preloadedState) => {
  return (
  `
  <!DOCTYPE html>
<html>
  <head>
  <link rel="stylesheet" href="assets/app.css" type="text/css"
    <title>Platzi Video</title>
  </head>
  <body>
    <div id="app">${html}</div>
    <script>
    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
    /</g,
    '\\u003c'
    )}
    </script>
    <script src="assets/app.js" type="text/javascript"></script>
  </body>
</html>
  `
  )
}

// poder renderizar la app y a convertir a string
const renderApp = (req, res) => {
  const store = createStore(reducer, initialState)
  // nos va a traer todo el estado inicial configurado para poder ser pasado por nuestra configuración
  const preloadedState = store.getState()
  const html = renderToString(
    // llamar a nuestro provider
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes)}
      </StaticRouter>
    </Provider>
  )
  // llamamos a nuestro setResponse para que sea respondido como una funcion de nuestro archivo de respuesta de nuestro servidor
  res.send(setResponse(html, preloadedState))
}

app.get('*', renderApp)

app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Server running on port 3000')
  }
})
