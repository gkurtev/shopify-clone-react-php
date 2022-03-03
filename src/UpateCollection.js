import axios from 'axios';
import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function UpateCollection({ collection, refetchData, setShow }) {
  const handle = collection.handle;
  const action_type = 'update';
  const [name, setName] = useState(collection.title);
  const [valid, setValid] = useState(true);
  const imageRef = useRef();
  const [image, setImage] = useState('');

  const handleUpdate = (event) => {
    event.preventDefault();

    if (name.length <= 0) {
      setValid(false);

      return;
    } else {
      setValid(true);
    }

    const formData = new FormData();

    formData.append('name', name);
    formData.append('handle', handle);
    formData.append('action_type', action_type);

    if (image) formData.append('file', image);

    updateCollection(formData).then((res) => {
      if (res.status_code === 201) {
        refetchData();
        setShow(false);
      }
    });
  };

  const updateCollection = async (body) => {
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
    <div className='bg-white -mt-1 pt-4 px-4'>
      <form action='' onSubmit={(e) => handleUpdate(e)}>
        <div className='update-collection__body'>
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
                  <p className='input-field__error__text text-red-400  mt-2'>*cannot be empty</p>
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
        </div>

        <div className='update-collection__actions pb-4 pt-4'>
          <button type='submit' className='underline'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
