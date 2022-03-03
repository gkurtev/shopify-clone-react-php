import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { CSSTransition } from 'react-transition-group';

export default function CreateCollection() {
  const action_type = 'create';

  // use ref to clear file input value after submit
  const imageRef = useRef();

  // states
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [valid, setValid] = useState(true);
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    const { data } = await axios.get('http://localhost/my-app/src/backend/api/collections.php');

    setCollections(data.collections);
  };

  const { refetch } = useQuery('collections', fetchCollections);

  const removeCollection = (handle, image) => {
    axios
      .delete('http://localhost/my-app/src/backend/api/collections.php', {
        data: {
          handle,
          image,
        },
      })
      .then(() => {
        const filteredCollections = collections.filter((c) => c.handle !== handle);

        setCollections(filteredCollections);
      });
  };

  const submitForm = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();

    // create form data
    bodyFormData.append('name', name);
    bodyFormData.append('action_type', action_type);

    // create image data if exists
    if (image) bodyFormData.append('file', image);

    if (name.length <= 0) {
      setValid(false);
      return;
    } else {
      createCollection(bodyFormData).then((res) => {
        setValid(res.status_code);

        if (res.status_code === 201) {
          // clear values
          setName('');
          setImage('');
          imageRef.current.value = '';

          // refetch query
          refetch();
        }
      });
    }
  };

  const createCollection = async (body) => {
    const { data } = await axios.post(
      'http://localhost/my-app/src/backend/api/collections.php',
      body,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return data;
  };

  return (
    <>
      <div className='register-form m-auto max-w-sm p-4 bg-white'>
        <div className='resigter-form__inner'>
          <form onSubmit={(e) => submitForm(e)}>
            <div className='register-form__head'>
              <h2 className='register-form__title text-center text-gray-700 text-xl mb-5'>
                Create collection
              </h2>
            </div>
            <CSSTransition in={valid === 201} className='alert' timeout={400} unmountOnExit>
              <div>
                <p className='text-green-600 mt-4 mb-4'>Successfully created a collection</p>
              </div>
            </CSSTransition>
            <CSSTransition in={valid === 404} className='alert' timeout={400} unmountOnExit>
              <div>
                <p className='text-red-600 mt-4 mb-4'>Collection already exists</p>
              </div>
            </CSSTransition>
            <div className='register-form__body'>
              <div className='register-form__row mb-4'>
                <div>
                  <div className='input-field__controls'>
                    <label htmlFor='collectionName' className='hidden'>
                      Collection Title
                    </label>

                    <input
                      type='text'
                      placeholder='Title'
                      name='collectionName'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`appearance-none border-morder py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                      id='collectionName'
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

              <div className='register-form__row mb-4'>
                <div>
                  <div className='input-field__controls'>
                    <label htmlFor='collectionImage' className='hidden'>
                      Image
                    </label>

                    <input
                      type='file'
                      ref={imageRef}
                      placeholder='Title'
                      name='collectionImage'
                      onChange={(e) => setImage(e.target.files[0])}
                      className={`appearance-none border-morder py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                      id='collectionImage'
                    />
                  </div>
                </div>
              </div>

              <div className='register-form__actions'>
                <button className='btn bg-green-600' type='submit'>
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {collections.length > 0 && (
        <div className='all-collections mt-6'>
          <ul>
            {collections.map((c) => {
              return (
                <li className='mb-3' key={c.handle}>
                  <div className='bg-white rounded-md px-4 py-3 shadow flex justify-between items-center'>
                    <div className='flex items-center'>
                      {c.image && <img src={`images/${c.image}`} className='w-20 h-20' alt='' />}
                      <div className='ml-2'>
                        <a className='underline text-blue-500' href={`/collections/${c.handle}`}>
                          {c.title}
                        </a>
                      </div>
                    </div>

                    <button
                      className='btn bg-red-600'
                      onClick={() => {
                        removeCollection(c.handle, c.image);
                      }}
                    >
                      remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
