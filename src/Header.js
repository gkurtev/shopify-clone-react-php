import React from 'react';
import { useDispatch } from 'react-redux';
import { open } from './features/miniCartSlice';
import Navigation from './Navigation';

export default function Header() {
  const dispatch = useDispatch();

  return (
    <div className='header bg-white mb-20 p-4'>
      <div className='header__inner flex justify-between items-center'>
        <div className='header__content'>
          <Navigation />
        </div>

        <div className='header__aside'>
          <button onClick={() => dispatch(open())}>cart(0)</button>
        </div>
      </div>
    </div>
  );
}
