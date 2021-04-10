import express from 'express'
import dotenv from 'dotenv'
import webpack from 'webpack'
import helmet from 'helmet'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { renderRoutes } from 'react-router-config'
import { StaticRouter } from 'react-router-dom'
import serverRoutes from '../frontend/routes/serverRoutes'
import reducer from '../frontend/reducers'
import initialState from '../frontend/initialState'
import getManifest from '../server/getManifest'
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
} else {
  app.use((req, res, next) => {
    if(!req.hashManifest) req.hashManifest = getManifest()
    next()
  })
  // carpeta publica donde vamos aguardar todos los archivos que generemos dentro de nuestro bundle de webpack
  app.use(express.static(`${__dirname}/public`))
  app.use(helmet())
  app.use(helmet.permittedCrossDomainPolicies({
    permittedPolicies: 'by-content-type'
  }))
  app.disable('x-powered-by')
}

// está recibiendo un html y ese mismo lo vamos a insertar en medio de donde colocamos nuestro entrypoint para que nuestra app del frontend entre
const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css'
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js'
  const vendorBuild = manifest ? manifest['vendor.js'] : 'assets/vendor.js'

  return (
  `
  <!DOCTYPE html>
<html>
  <head>
  <link rel="stylesheet" href="${mainStyles}" type="text/css"
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
    <script src="${mainBuild}" type="text/javascript"></script>
    <script src="${vendorBuild}" type="text/javascript"></script>
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
  res.set('Content-Security-Policy', "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
  // llamamos a nuestro setResponse para que sea respondido como una funcion de nuestro archivo de respuesta de nuestro servidor
  res.send(setResponse(html, preloadedState, req.hashManifest))
}

app.get('*', renderApp)

app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Server running on port ${PORT}`)
  }
})
