import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { saveCollection, saveTitle } from './features/productAdminSlice';
import { fetchCollections } from './helpers/helpers';
import ProductOptions from './ProductOptions';
import ProductVariants from './ProductVariants';

export default function CreateProduct() {
  const product = useSelector((state) => state.productCreate);
  const dispatch = useDispatch();
  const [valid, setValid] = useState(true);
  const [collections, setCollections] = useState([]);

  const { refetch } = useQuery('collections', () => {
    fetchCollections().then((res) => setCollections(res.collections));
  });

  useEffect(() => {});

  const saveProduct = () => {
    const { product: productData } = product;
    const formData = new FormData();

    formData.append('title', productData.title);
    formData.append(
      'collection',
      productData.collection === 'none' ? null : productData.collection
    );
    formData.append('action_type', 'create');
    formData.append('variants', JSON.stringify(productData.variants));

    if (productData.options) {
      formData.append('options', JSON.stringify(productData.options));
    }

    dunkProduct(formData).then((res) => console.log(res));
  };
  const dunkProduct = async (body) => {
    const { data } = await axios.post('http://localhost/my-app/src/backend/api/product.php', body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  };

  return (
    <>
      <div className='mb-5'>
        <button className='btn bg-green-500' onClick={saveProduct}>
          Save
        </button>
      </div>

      <div className='create-product'>
        <div className='create-product__head mb-5'>
          <h1>Product Creation</h1>
        </div>
        <div className='create-product__body'>
          <form action=''>
            <div className='form__body'>
              <div className='form__row mb-3'>
                <div className='p-4 bg-white'>
                  <div className='input-field__controls'>
                    <label htmlFor='productTitle' className='hidden'>
                      Product Title
                    </label>

                    <input
                      type='text'
                      placeholder='Product Title'
                      name='productTitle'
                      value={product.title}
                      onChange={(e) => dispatch(saveTitle(e.target.value))}
                      className={`appearance-none border-morder py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                      id='productTitle'
                    />
                  </div>

                  <CSSTransition in={!valid} className='alert' timeout={400} unmountOnExit>
                    <div className='input-field__error'>
                      <p className='input-field__error__text text-red-400  mt-2'>
                        *cannot be empty
                      </p>
                    </div>
                  </CSSTransition>
                </div>
              </div>

              {collections.length && (
                <div className='form__row'>
                  <div className='p-4 bg-white'>
                    <div className='input-field__controls'>
                      <label htmlFor='collection' className='block mb-3'>
                        Select collection
                      </label>

                      <select
                        name='collection'
                        value={product.collection}
                        onChange={(e) => dispatch(saveCollection(e.target.value))}
                        className={`appearance-none w-full border-morder py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id='collection'
                      >
                        <option value='none'>No collection selected</option>

                        {collections.map((c, index) => (
                          <option key={index} value={c.handle}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className='product-options'>
                <ProductOptions />
              </div>

              <div className='mt-8 mb-8'>
                <ProductVariants />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
