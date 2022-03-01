import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, open } from './features/miniCartSlice';
import { moneyFormat } from './helpers/helpers';
import './ProductCard.css';
export default function ProductCard({ product }) {
  const [activeVariant, setActiveVariant] = useState({
    productId: product.id,
  });
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    selectActiveVariant();

    setOptions(() => product.options?.map((o) => o.name));
  }, []);

  const addProduct = () => {
    if (!activeVariant.available) return;

    dispatch(addToCart(activeVariant));
    dispatch(open());
  };
  const renderColorSwatches = () => {
    if (~options.indexOf('Color')) {
      return (
        <div className='list-colors'>
          <ul className='flex -m-2'>
            {product.variants.map((v) => {
              return (
                <li key={v.id} className='p-2'>
                  <label
                    htmlFor={product.id + v.id}
                    onClick={() => selectActiveVariant(true, v.id)}
                    className={`h-8 rounded-full w-8 block ${
                      v.id === activeVariant.id ? 'border-morder-lg' : ''
                    }`}
                    style={{ backgroundColor: v.title.toLowerCase() }}
                  ></label>
                  <input type='text' id={product.id + v.id} className='hidden appearance-none' />
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  };

  const selectActiveVariant = (selected = false, variantId = false) => {
    let selectedVariant = false;

    if (selected && variantId) {
      selectedVariant = product.variants.find((v) => v.id === variantId);
    } else {
      selectedVariant = product.variants.find((v) => v.available);
    }

    selectedVariant
      ? setActiveVariant((prevValue) => ({
          ...prevValue,
          ...selectedVariant,
        }))
      : setActiveVariant((prevValue) => ({
          ...prevValue,
          ...product.variants[0],
        }));
  };
  return (
    <div className='product-card bg-white shadow'>
      <div className='product-card__media  relative'>
        {!activeVariant?.available ? (
          <span className='rounded-lg text-white absolute uppercase left-2 top-2 inline-block px-2 py-1 z-10 bg-red-600'>
            sold out
          </span>
        ) : (
          ''
        )}
        <img
          className='object-cover w-full h-full absolute top-0 left-0'
          src='https://source.unsplash.com/user/erondu/1600x900'
          alt='test'
        />
      </div>

      <div className='product-card__content py-4 px-2'>
        <h6 className='mb-4'>{product.title}</h6>

        {activeVariant && <p className='mb-2'>{moneyFormat(activeVariant.price)}</p>}

        {activeVariant && ~options.lastIndexOf('Color') && <p>Color: {activeVariant.title}</p>}

        <div className='product-card__options mt-4'>{renderColorSwatches()}</div>

        <div className='product-card__actions mt-5'>
          <button
            onClick={addProduct}
            className={`inline-flex px-2 py-2 text-white bg-black uppercase text-sm rounded-lg ${
              !activeVariant?.available ? 'disabled' : ''
            }`}
          >
            Add to bag
          </button>
        </div>
      </div>
    </div>
  );
}
