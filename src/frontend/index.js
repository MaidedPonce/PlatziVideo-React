import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import reducer from './reducers';
import App from './routes/App';
// reducer viene de la carpeta de reducers que creamos y del archivo index

const history = createBrowserHistory();
const preloadedState = window.__PRELOADED_STATE__;
// conexion a devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
// referencia a nuestro store. Crear un nuevo store para poderselo pasar a nuestro provider. Va a utilizar a createStore y va a recibir dos parámetros: el primero un reducer y el segundo el estado inicial
const store = createStore(reducer, preloadedState, composeEnhancers());
// proteger y que no se muestren nuestros "datos"
delete window.__PRELOADED_STATE;

ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
