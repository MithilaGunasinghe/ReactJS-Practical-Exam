import React from 'react';
import '../styles/cart-item.scss';

export default function CartItem({ item }) {
  return (
    <div className='row cart-item'>
      <div className='col-2'>
        <img height='60' src={item.details.image} alt='tshirt' />
      </div>
      <div className='col-8'>
        <div className='title'>{item.name}</div>
        <div className='type'>
          {item.details.size} | {item.details.type}
        </div>
        <div className='quantity'>Quantity: {item.quantity}</div>
      </div>
      <div className='col-2 price'>${item.details.price}</div>
    </div>
  );
}
