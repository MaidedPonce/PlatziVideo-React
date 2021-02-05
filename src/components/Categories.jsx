import React from 'react'
import '../assets/styles/components/Categories.scss'
const Categories = ({ children, title }) => (
  // voy a estructurar para que no solo mande la etiqueta h3 sino que lo encapsule en un div y luego pueda mandar un hijo que en este caso va hacer render de otro componente
  <div className='categories'>
    <h3 className='categories__title'>{title}</h3>
    {children}
  </div>
)

export default Categories
