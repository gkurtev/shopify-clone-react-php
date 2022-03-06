import { useEffect, useState } from 'react';
import ProductOption from './ProductOption';

export default function ProductOptions() {
  let optionData = {
    optionName: '',
    values: [],
  };

  const [options, setOptions] = useState([]);

  const addAnotherOption = () => {
    setOptions((oldArray) => [...oldArray, optionData]);
  };

  useEffect(() => {});

  return (
    <>
      <h6 className='mb-4 mt-4'>Options</h6>
      <div className='mb-4'>
        {options.map((o, i) => (
          <ProductOption key={i} option={o} index={i} setOptions={setOptions} />
        ))}
      </div>

      {options.length < 2 && (
        <div className='mt-10'>
          <span onClick={addAnotherOption} className='btn'>
            Add an option
          </span>
        </div>
      )}
    </>
  );
}
