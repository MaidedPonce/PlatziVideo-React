import React from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Search from '../components/Search'
import Categories from '../components/Categories'
import Carousel from '../components/Carousel'
import CarouselItem from '../components/CarouselItem'
import '../assets/styles/App.scss'

// trarele por desestructuracion los elementos que tengo como props
const Home = ({ myList, trends, originals }) => {
  return (
    <>
      <Header />
      <Search isHome />
      {myList.length > 0 &&
        <Categories title='Mi Lista'>
          <Carousel>
            {myList.map(item =>
              <CarouselItem
                key={item.id}
                {...item}
                isList
              />
            )}
          </Carousel>
        </Categories>}
      <Categories title='Tendencias'>
        <Carousel>
          {trends.map(item =>
            <CarouselItem key={item.id} {...item} />
          )}
        </Carousel>
      </Categories>
      <Categories title='Originales de Platzi Video'>
        <Carousel>
          {originals.map(item =>
            <CarouselItem key={item.id} {...item} />
          )}
        </Carousel>
      </Categories>
    </>
  )
}
// trae los props a nuestro estado. Nos trae del edo a nuestros elementos
const mapStateToProps = state => {
  return {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals
  }
}
// voy hacer connect primero y luego a connect le voy a pasar dos parámetros principales, en este caso es el mapstate (mapeo de nuestras props) y obtenemos el dispah (elementos que vamos a disparar) los vamos a utilizar por medio de nuestros actions (como nuestra app no tiene, tenemos que pasar un nulo) y después conecto home
export default connect(mapStateToProps, null)(Home)
