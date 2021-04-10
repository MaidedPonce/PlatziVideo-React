import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import gravatar from '../utils/gravatar';
import { logoutRequest } from '../actions/index';
import '../assets/styles/components/Header.scss';
import logo from '../assets/static/logo-platzi-video-BW2.png';
import userIcon from '../assets/static/user-icon.png';

const Header = (props) => {
  // desestructurando nuestras propiedades para sacar a nuestros users
  const { user, isLogin, isRegister } = props;
  // validacion para saber si user tiene elementos
  const hashUser = Object.keys(user).length > 0;

  const handleLogout = () => {
    // trabajar con el edo, por tanto, crear un action para cerrar sesión. Conexion con logout
    props.logoutRequest({});
  // con el objeto vacio yo reinicio el edo y asi ya no habria usuario (simulacion de logout y login)
  };

  const headerClass = classNames('header', {
    isLogin,
    isRegister,
  });
  return (
    <header className={headerClass}>
      <Link to='/'>
        <img className='header__img' src={logo} alt='Platzi Video' />
      </Link>
      <div className='header__menu'>
        <div className='header__menu--profile'>
          {hashUser ?
          // validation: if hashUser is validate o true I going to put to gravatar
            <img src={gravatar(user.email)} alt={user.email} /> :
          // else, the image that I have by default
            <img src={userIcon} alt='' />}
          <p>Perfil</p>
        </div>
        <ul>
          {hashUser ? // saber si tenemos o no una cuenta iniciada. Si nosotros tenemos un usuario, va a mostrar esta sección y de lo contrario mostrariamos un null para no mostrar nada
            <li><a href='/'>{user.name}</a></li> :
            null}
          {hashUser ? // al darle click, cierre sesion
            <li><a href='#logout' onClick={handleLogout}>Cerrar Sesión</a></li> : (
              <li>
                <Link to='/login'>
                  Iniciar Sesión
                </Link>
              </li>
            )}
        </ul>
      </div>
    </header>
  );
};
const mapStateToProps = (state) => {
  return {
    // voy a retornar un user que está en el estado user
    user: state.user,
  };
};

// mapear. Acciones que vamos a disparar
const mapDispachToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispachToProps)(Header);
