import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../containers/Home'
import Login from '../containers/Login'
import Register from '../containers/Register'
import NotFound from '../containers/NotFound'
import Player from '../containers/Player'
import Layout from '../components/Layout'
// va a encapsular cada uno de los componentes: BrowserRouter
// añadir el elemento que necesito: Route
// le voy a decir que sea exacta : exact. Que cuando alguien entre a nuestra url principal, va a hacer el match con el path con el que va a recibir y luego vamos a exponer un componente. Entonces, si es exacta, le vamos a decir que utilice un componente y le vamos a pasar el componente que se llama App
// Al pasar un componente va a tomar nuestra aplicación como el defecto que debe de mostrar. Si no hay ruta hará render de este componente
const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/player/:id' component={Player} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
)

export default App
