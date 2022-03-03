import React, { useState } from 'react';
import UpateCollection from './UpateCollection';

export default function CollectionItem({ collection, refetchData, removeCollection }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className='bg-white rounded-md px-4 py-3 shadow flex justify-between items-center'>
        <div className='flex items-center'>
          {collection.image && (
            <img src={`images/${collection.image}`} className='w-20 h-20' alt='' />
          )}
          <div className='ml-2'>
            <a className='underline text-blue-500' href={`/collections/${collection.handle}`}>
              {collection.title}
            </a>
          </div>
        </div>
        <div className='flex items-center'>
          <button
            className={`btn mr-3 ${show ? 'bg-red-600' : 'bg-yellow-600'}`}
            onClick={() => setShow(!show)}
          >
            {show ? 'Cancel' : 'Update'}
          </button>
          <button
            className='btn bg-red-600'
            onClick={() => {
              removeCollection(collection.handle, collection.image);
            }}
          >
            remove
          </button>
        </div>
      </div>

      {show && (
        <UpateCollection collection={collection} refetchData={refetchData} setShow={setShow} />
      )}
    </>
  );
}
