import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Hero({ title, content, buttonText, buttonUrl }) {
  return (
    <div className='bg-yellow-200'>
      <div className='lg:flex px-6 py-4 mx-auto lg:h-128 lg:py-16'>
        <div className='flex flex-col items-center w-full lg:flex-row lg:w-1/2'>
          <div>
            <h1 className='text-3xl tracking-wide  text-black lg:text-4xl'>{title}</h1>
            <p className='mt-4  text-black'>{content}</p>

            <div className='mt-6'>
              <NavLink
                to={buttonUrl}
                className='block px-3 py-2 font-semibold text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md lg:inline hover:bg-blue-400'
              >
                {buttonText}
              </NavLink>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center w-full h-96 lg:w-1/2 mt-8 lg:mt-0'>
          <img
            className='object-cover w-full h-full rounded-md'
            src='https://source.unsplash.com/user/erondu/1600x900'
            alt='test'
          />
        </div>
      </div>
    </div>
  );
}
