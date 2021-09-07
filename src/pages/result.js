import React, { useEffect, useState } from 'react';
import '../styles/result.scss';
import Item from '../components/item';
import SideMenu from '../components/side-menu';

export const ResultsPage = () => {
  const [shirts, setShirts] = useState([]);
  const [types, setTypes] = useState([]);
  const [sizeFilter, setSizeFilters] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [typeFilter, setTypeFilter] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/prasadhewage/ecommerce/shipments')
      .then((response) => response.json())
      .then((data) => {
        setShirts(data);

        let _types = [];

        data.forEach((item) => {
          if (_types.indexOf(item.details.type) === -1) {
            _types.push(item.details.type);
          }
        });

        setTypes(_types);
      });
  }, []);

  const filter = (type) => {
    if (sizeFilter.indexOf(type) === -1) {
      setSizeFilters((oldFilters) => [...oldFilters, type]);
    } else {
      setSizeFilters((oldFilters) => oldFilters.filter((oldFilter) => oldFilter !== type));
    }
  };

  const changeSelect = (event) => {
    if (event.target.value === 'all') {
      setTypeFilter(null);
    } else {
      setTypeFilter(event.target.value);
    }
  };

  const filteredShirts = () =>
    shirts
      .filter((shirt) => (sizeFilter.length ? sizeFilter.indexOf(shirt.details.size) !== -1 : true))
      .filter((shirt) => (typeFilter ? typeFilter === shirt.details.type : true));

  const onAddToCart = (shirt) => {
    const i = cartItems.findIndex((item) => item.id === shirt.id);
    if (i !== -1) {
      let cartItemsCopy = [...cartItems];
      cartItemsCopy[i].quantity++;
      setCartItems(cartItemsCopy);
    } else {
      setCartItems((items) => [...items, { ...shirt, quantity: 1 }]);
    }
    console.log(cartItems);
  };
  return (
    <div className='container-fluid p-5'>
      <div className='row'>
        <div className='filters-wrapper'>
          <h5>Sizes:</h5>

          <div className='filters'>
            <div className={sizeFilter.indexOf('xsmall') > -1 ? 'active' : ''} onClick={(e) => filter('xsmall')}>
              <span>XS</span>
            </div>
            <div className={sizeFilter.indexOf('small') > -1 ? 'active' : ''} onClick={(e) => filter('small')}>
              <span>S</span>
            </div>
            <div className={sizeFilter.indexOf('medium') > -1 ? 'active' : ''} onClick={(e) => filter('medium')}>
              <span>M</span>
            </div>
            <div className={sizeFilter.indexOf('mlarge') > -1 ? 'active' : ''} onClick={(e) => filter('mlarge')}>
              <span>ML</span>
            </div>
            <div className={sizeFilter.indexOf('large') > -1 ? 'active' : ''} onClick={(e) => filter('large')}>
              <span>L</span>
            </div>
            <div className={sizeFilter.indexOf('xlarge') > -1 ? 'active' : ''} onClick={(e) => filter('xlarge')}>
              <span>XL</span>
            </div>
            <div className={sizeFilter.indexOf('xxlarge') > -1 ? 'active' : ''} onClick={(e) => filter('xxlarge')}>
              <span>XXL</span>
            </div>
          </div>
        </div>
        <div className='results'>
          <div className='row top-bar'>
            <div className='shirt-count'>{filteredShirts().length} product(s) found</div>
            <select onChange={changeSelect}>
              <option value='all'>All</option>
              {types.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className='items'>
            {filteredShirts().map((shirt, i) => (
              <Item key={i} shirt={shirt} addToCart={() => onAddToCart(shirt)} />
            ))}
          </div>
        </div>
        <SideMenu open={cartOpen} closeNav={() => setCartOpen(false)} cartItems={cartItems} />

        <div className='btn-cart' onClick={() => setCartOpen((open) => !open)}>
          <img width='56' src='../../assets/images/cart.png' alt='cart' />
        </div>
      </div>
    </div>
  );
};
