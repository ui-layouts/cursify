import React from 'react'
import logo from '../../assets/cursify2.svg'
import { Link } from 'react-router-dom'
const Logo = () => {
  return (
    <Link to={'/'}>
      <img src={logo} alt="logo" className='w-60 h-full' />
    </Link>
  )
}

export default Logo
