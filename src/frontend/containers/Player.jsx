import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getVideoSource } from '../actions/index'
import '../assets/styles/components/Player.scss'
import NotFound from '../containers/NotFound'

const Player = props => {
  // esta parte no las manda router en el momento que generamos nuestra ruta (player:id) y de esta forma estamos haciendo un match con los paramtetros que estamos recibiendo. Nosotros podemos pasar una serie de parametros y obtenerlos y de esta forma generar validaciones o hacer algun efecto. En este caso seria buscar el video que le corresponde a este id.
  const { id } = props.match.params
  // validar si hay un video ejecutandose. Nosotros tenemos el filtro de nuestro reducer, obtenemos el valor que coincida con el id, y tenemos un objeto. Nosotros no podemos utilizar 'length' porque no lo va a reconocer. Entonces tenemos que obtener cuántos elementos tiene ese objeto (con 'Object.keys') y de esta forma saber si tiene más de cero elementos y de esta forma saber si tenemos un elemento qué mostrar
  const hashPlaying = Object.keys(props.playing).length > 0
  // si nosotros queremos transmitir un evento que nos permita ejecutar el accion que se va a encargar de tener el id y luego mandar a nuestro reducer. Vamos a utilizar hooks
  useEffect(() => {
    props.getVideoSource(id)
  }, [])
  return hashPlaying ? (
    <div className='Player'>
      <video controls autoPlay>
        <source src={props.playing.source} type='video/mp4' />
      </video>
      <div className='Player-back'>
        <button type='button' onClick={() => props.history.goBack()}>
          Regresar
        </button>
      </div>
    </div>
  ) : <NotFound />
}

const mapStateToProps = state => {
  return {
    playing: state.playing
  }
}
const mapDispatchToProps = {
  getVideoSource
}
export default connect(mapStateToProps, mapDispatchToProps)(Player)
