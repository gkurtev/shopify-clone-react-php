import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { saveCollection, saveTitle } from './features/productAdminSlice';
import { fetchCollections } from './helpers/helpers';
import ProductOptions from './ProductOptions';
import ProductVariants from './ProductVariants';

export default function CreateProduct() {
  const product = useSelector((state) => state.productCreate);
  const dispatch = useDispatch();
  const [created, setCreated] = useState(false);
  const [collections, setCollections] = useState([]);

  const { refetch } = useQuery('collections', () => {
    fetchCollections().then((res) => setCollections(res.collections));
  });

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

    dunkProduct(formData).then((res) => {
      const { product_created } = res;

      if (product_created) setCreated(true);
    });
  };
  const dunkProduct = async (body) => {
    const { data } = await axios.post('http://localhost/my-app/src/backend/api/product.php', body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  };

  return (
    <>
      {created ? (
        <div className='bg-white p-4 w-full text-center text-green-700'>
          product was successfully created
        </div>
      ) : (
        <div>
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
        </div>
      )}
    </>
  );
}
