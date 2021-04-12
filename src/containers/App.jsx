import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Search from '../components/Search'
import Categories from '../components/Categories'
import Carousel from '../components/Carousel'
import Carouselitem from '../components/Carouselitem'
import Footer from '../components/Footer'
import useInitialState from '../hooks/useInitialState'
import '../assets/styles/App.scss'
// const fetch = require('node-fetch')
// npx json-server --watch initialState.json
// contenedor principal
const API = 'http://localhost:3000/initalState'
const App = () => {
  const initialState = useInitialState(API)
  return initialState.length === 0 ? <h1>Loading..</h1> : (

    <div className='App'>
      <Header />
      <Search />
      {initialState.mylist.length > 0 &&
        <Categories title='Mi lista'>
          <Carousel>
            {initialState.mylist.map(item =>
              <Carouselitem
                key={item.id}
                {...item}
              />
            )}
          </Carousel>
        </Categories>}
      <Categories title='Tendencias'>
        <Carousel>
          {initialState.trends.map(item =>
            <Carouselitem key={item.id} {...item} />
          )}
        </Carousel>
      </Categories>

      <Categories title='Originales de Platzi-Video'>
        <Carousel>
          {initialState.originals.map(item =>
            <Carouselitem key={item.id} {...item} />
          )}
        </Carousel>
      </Categories>

      <Footer />
    </div>
  )
}

export default App
