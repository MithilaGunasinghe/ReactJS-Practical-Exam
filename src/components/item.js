import React from 'react';
import PropTypes from 'prop-types';
import '../styles/item.scss';

function Item({ shirt, addToCart }) {
  return (
    <div className='item-wrapper'>
      <div className='image-wrapper'>
        <img src={shirt.details.image} alt='tshirt' />
        <span>{shirt.details.tag}</span>
      </div>
      <div className='title'>{shirt.name}</div>
      <div className='price'>${shirt.details.price}</div>
      <div className='sub-price'>or 5 x {shirt.details.price}</div>
      <div className='button-wrapper'>
        <button className='btn btn-primary' onClick={() => addToCart()}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  shirt: PropTypes.object,
  addToCart: PropTypes.func,
};

export default Item;
