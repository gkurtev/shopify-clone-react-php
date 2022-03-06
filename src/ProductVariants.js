import { useDispatch, useSelector } from 'react-redux';
import { savePrice, saveQuantity } from './features/productAdminSlice';
import { moneyFormat } from './helpers/helpers';

export default function ProductVariants() {
  const { product } = useSelector((state) => state.productCreate);
  const dispatch = useDispatch();

  const changePrice = (e, index) => {
    dispatch(savePrice({ value: e.target.value, index }));
  };

  const changeQuantity = (e, index) => {
    dispatch(saveQuantity({ value: e.target.value, index }));
  };

  const renderVariants = () => {
    return product.variants.map((v, index) => {
      return (
        <div key={index} className='mb-5 bg-white shadow p-4'>
          <p className='mb-2 btn bg-orange-700'>{v.title}</p>
          <div className='mb-2 flex items-center'>
            price:{' '}
            <input
              type='text'
              className='input-field ml-4 mr-4 w-auto'
              onChange={(e) => changePrice(e, index)}
              placeholder='0.00'
              value={v.price}
            />{' '}
            ={moneyFormat(v.price)}
          </div>

          <div className='mb-2 items-center flex'>
            quantity:{' '}
            <input
              type='text'
              className='input-field ml-4 w-auto'
              placeholder='0.00'
              onChange={(e) => changeQuantity(e, index)}
              value={v.quantity}
            />
          </div>
        </div>
      );
    });
  };
  return <>{renderVariants()}</>;
}
