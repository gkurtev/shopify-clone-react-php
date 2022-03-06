import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveOptions } from './features/productAdminSlice';

export default function ProductOption({ option, index, setOptions }) {
  const textAreaContent = option.variants ? option.variants.join('\r\n') : '';
  const [optionName, setOptionName] = useState(option.optionName);
  const [variants, setVariants] = useState(textAreaContent);
  const dispatch = useDispatch();

  const handleOptionSaved = (e) => {
    e.preventDefault();
    const formattedVariants = variants.split('\n').map((opt) => opt.trim());

    const newData = {
      optionName,
      values: formattedVariants,
      position: index,
    };

    setOptions((oldArray) => {
      const newArray = [...oldArray];
      newArray[index] = newData;
      dispatch(saveOptions({ options: newData }));
      return newArray;
    });
  };

  const handleOptionRemove = (e) => {
    e.preventDefault();
    setOptions((oldArray) => {
      const newArr = [...oldArray];
      newArr.splice(index, 1);

      return newArr;
    });
  };

  return (
    <div className='form__row mt-5'>
      <div className='form__controls mb-3'>
        <input
          type='text'
          id='product-option'
          value={optionName}
          onChange={(e) => setOptionName(e.target.value)}
          placeholder='Option...'
          className='input-field'
        />
      </div>

      <div className='form__whatever'>
        <div className='form__textarea'>
          <textarea
            name=''
            id=''
            value={variants}
            onChange={(e) => setVariants(e.target.value)}
            cols='20'
            placeholder='Variant...'
            rows='10'
            className='p-4 border-morder bg-white'
          ></textarea>
        </div>

        <div className='form__actions mt-3'>
          <a href='/' className='btn bg-green-600' onClick={(e) => handleOptionSaved(e)}>
            save
          </a>

          <a href='/' className='ml-4 btn bg-red-600' onClick={(e) => handleOptionRemove(e)}>
            remove
          </a>
        </div>
      </div>
    </div>
  );
}
