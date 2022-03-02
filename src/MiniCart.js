import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { close } from './features/miniCartSlice';
import { calculateCartCount, moneyFormat } from './helpers/helpers';

export default function MiniCart() {
  const isOpen = useSelector((state) => state.miniCart.isOpen);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.miniCart.cartItems);

  const totalPrice = () => {
    return cartItems.reduce((sum, current) => {
      return (sum += current.quantity * current.price);
    }, 0);
  };

  const renderCartItems = () => {
    return cartItems.map((ci, index) => {
      return (
        <div key={index} className='mini-cart__item mb-4'>
          <CartItem item={ci} index={index} />
        </div>
      );
    });
  };

  return (
    <div
      className={`transition-all mini-cart overflow-hidden fixed z-40 left-0 top-0 h-full w-full ${
        isOpen ? 'mini-cart-active' : 'mini-cart-hidden'
      }`}
    >
      <div className='ml-auto mini-cart__inner transition-all flex h-full flex-col max-w-md bg-white w-full'>
        <div className='mini-cart__head flex justify-between items-center py-4 px-4 border-b border-solid border-b-black'>
          <p>
            Your Cart <span>({cartItems.length ? calculateCartCount(cartItems) : 0})</span>
          </p>
          <span
            className='px-2 py-1 inline-block bg-blue-400 text-white'
            onClick={() => dispatch(close())}
          >
            X
          </span>
        </div>
        <div className='mini-cart__body grow overflow-y-auto'>
          {cartItems.length ? (
            renderCartItems()
          ) : (
            <div className='h-full w-full flex justy-center items-center text-center'>
              <p className='w-full'>Your cart is empty</p>
            </div>
          )}
        </div>
        {cartItems.length && (
          <div className='mini-cart__foot border-t-black border-t border-solid p-4'>
            <div className='flex justify-between align-center mb-5'>
              <span>Total:</span>
              <span>{moneyFormat(totalPrice())}</span>
            </div>
            <div>
              <button className='w-full p-4 bg-black text-white inline-flex justify-center uppercase font-bold'>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      <span
        className='fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black -z-10'
        onClick={() => dispatch(close())}
      ></span>
    </div>
  );
}
