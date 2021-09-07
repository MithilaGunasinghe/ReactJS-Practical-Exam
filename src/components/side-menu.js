import React from 'react';

import '../styles/side-menu.scss';
import CartItem from './cart-item';

export default function SideMenu({ open, closeNav, cartItems }) {
  return (
    <div>
      <div id='mySidenav' className={'sidenav ' + (open ? 'open' : '')}>
        <a href='#' className='closebtn' onClick={() => closeNav()}>
          &times;
        </a>

        <div className='container'>
          {cartItems.map((item, i) => (
            <CartItem key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
