import React from 'react';
import { useDispatch } from 'react-redux';
import { open } from './features/miniCartSlice';
import Navigation from './Navigation';
import { useSelector } from 'react-redux';
import { calculateCartCount } from './helpers/helpers';

export default function Header() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.miniCart.cartItems);

  return (
    <div className='header bg-white mb-20 p-4'>
      <div className='header__inner flex justify-between items-center'>
        <div className='header__content'>
          <Navigation />
        </div>

        <div className='header__aside'>
          <button onClick={() => dispatch(open())}>
            cart({cartItems.length ? calculateCartCount(cartItems) : 0})
          </button>
        </div>
      </div>
    </div>
  );
}
