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
const API = 'https://localhost:3000/initialState'
const App = () => {
  const [videos, setVideos] = useState({
    mylist: [],
    trends: [{
      id: 2,
      slug: 'tvshow-2',
      title: 'In the Dark',
      type: 'Scripted',
      language: 'English',
      year: 2009,
      contentRating: '16+',
      duration: 164,
      cover: 'http://dummyimage.com/800x600.png/99118E/ffffff',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'https://mdstrm.com/video/58333e214ad055d208427db5.mp4'
    }],
    originals: [{
      id: 4,
      slug: 'tvshow-4',
      title: 'Grand Hotel',
      type: 'Comedy',
      language: 'English',
      year: 2014,
      contentRating: '16+',
      duration: 163,
      cover: 'http://dummyimage.com/800x600.png/5472FF/ffffff',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'https://mdstrm.com/video/58333e214ad055d208427db5.mp4'
    }]
  })
  useEffect(() => {
    fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      }
      // body: JSON.stringify(myVar)
    })
      .then((response) => response.json())
      .then((data) => setVideos(data))
  }, [])
  console.log(videos)
  return (
    <div className='App'>
      <Header />
      <Search />
      {videos.mylist && videos.mylist.length && (
        <Categories title='Mi lista'>
          <Carousel>
            <Carouselitem />
          </Carousel>
        </Categories>)}

      <Categories title='Tendencias'>
        <Carousel>
          {videos.trends.map(item =>
            <Carouselitem key={item.id} {...item} />
          )}
        </Carousel>
      </Categories>

      <Categories title='Originales de Platzi-Video'>
        <Carousel>
          {videos.originals.map(item =>
            <Carouselitem key={item.id} {...item} />
          )}
        </Carousel>
      </Categories>

      <Footer />
    </div>
  )
}

export default App
