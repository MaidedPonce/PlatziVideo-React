import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginRequest } from '../actions'
import Header from '../components/Header'
import '../assets/styles/components/Login.scss'
import googleIcon from '../assets/static/google-icon.png'
import twitterIcon from '../assets/static/twitter-icon.png'

const Login = (props) => {
  const [form, setValues] = useState({
    // le estoy pasando un objeto que va a ser la info inicial de este edo
    email: ''
  })
  /** Tenemos un name en el input y nos estamos trayendo el valor de lo que estoy colocando en el input y de esta forma puedo crear un nombre que sea dinamico segun el input que se esta manipulando */
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    })
  }
  // cuando nosotros le demos enviar a nuestro formulario, va a capturar nuestra info y la va a presentar donde sea necesario
  const handleSubmit = (event) => {
    // cuando estamos trabajado con formularios en react, tenemos que pasarle el event.preventDefault porque no queremos que el formato que originalmente tiene html para manejar eventos dentro de un formulario se cumpla. Cuando le doy al boton de enviar o de iniciar sesión manda los parametros por url y esto puede causar conflicto
    event.preventDefault()
    props.loginRequest(form)
    props.history.push('/')
  }

  return (
    <>
      <Header isLogin />
      <section className='login'>
        <section className='login__container'>
          <h2>Inicia sesión</h2>
          <form className='login__container--form' onSubmit={handleSubmit}>
            <input
              name='email'
              className='input'
              type='text'
              placeholder='Correo'
              onChange={handleInput}
            />
            <input
              name='password'
              className='input'
              type='password'
              placeholder='Contraseña'
              onChange={handleInput}
            />
            <button className='button' type='button'>Iniciar sesión</button>
            <div className='login__container--remember-me'>
              <label htmlFor='cbox1'>
                <input type='checkbox' id='cbox1' value='first_checkbox' />
                Recuérdame
              </label>
              <a href='/'>Olvidé mi contraseña</a>
            </div>
          </form>
          <section className='login__container--social-media'>
            <div>
              <img src={googleIcon} alt='googleIcon' />
              {' '}
              Inicia sesión con Google
            </div>
            <div>
              <img src={twitterIcon} alt='twitterIcon' />
              {' '}
              Inicia sesión con Twitter
            </div>
          </section>
          <p className='login__container--register'>
            No tienes ninguna cuenta
            {' '}
            <Link to='/register'>
              Registrate
            </Link>
          </p>
        </section>
      </section>
    </>
  )
}

const mapDispatchToProps = {
  // traer la info de nuestro login
  loginRequest
}

export default connect(null, mapDispatchToProps)(Login)
