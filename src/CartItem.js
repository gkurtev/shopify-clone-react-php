import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from './features/miniCartSlice';
import { moneyFormat } from './helpers/helpers';

export default function CartItem({ item, index }) {
  const dispatch = useDispatch();

  return (
    <div className='cart-item'>
      <div className='cart-item__inner'>
        <div className='cart-item__image'>
          <img
            className='object-cover w-full h-full'
            src='https://source.unsplash.com/user/erondu/1600x900'
            alt='test'
          />
        </div>
        <div className='cart-item__content'>
          <h6>{item.productTitle}</h6>
          <p>{item.title}</p>

          <p>{moneyFormat(item.price)}</p>

          <p>
            Quantity:{' '}
            <span
              onClick={() =>
                dispatch(updateQuantity({ type: 'decrement', quantity: item.quantity, index }))
              }
            >
              -
            </span>{' '}
            {item.quantity}{' '}
            <span
              onClick={() =>
                dispatch(updateQuantity({ type: 'increment', quantity: item.quantity, index }))
              }
            >
              +
            </span>
          </p>
          <div onClick={() => dispatch(removeFromCart(item.id))}>
            <button>remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
