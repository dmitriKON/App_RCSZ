import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
        <NavLink to="/home" style={{'textDecoration': 'none', 'color':'#f5fff7'}}>ZLAGODA</NavLink>
        <p style={{'color':'#f5fff7', 'fontSize': '13px'}}>Biloverbenko, Zhydok, Kondratenko</p>
    </div>
  )
}
 
export default Footer;