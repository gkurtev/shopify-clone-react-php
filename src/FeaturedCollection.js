import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import ProductCard from './ProductCard';

export default function FeaturedCollection({ title }) {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { data } = await axios.get('products-data.json');

    setProducts(data);
    return data;
  };

  const { isLoading } = useQuery('products', fetchData, { cacheTime: 0 });

  return (
    <div className='featured-collection mt-8 mb-8'>
      <div className='featured-collection__head text-center mb-5'>
        <h2 className='text-3xl'>{title}</h2>
      </div>

      <div className='featured-collection__body'>
        {isLoading ? (
          <p className='py-4 px-2 bg-white text-center'>Loading...</p>
        ) : (
          <div className='featured-collection__products md:flex flex-wrap md:-m-2'>
            {products.length > 0 &&
              products.map((product) => {
                return (
                  <div
                    className='featured-collection__product mb-4 md:p-2 md:w-1/2 lg:w-1/3'
                    key={product.id}
                  >
                    <ProductCard product={product} />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
