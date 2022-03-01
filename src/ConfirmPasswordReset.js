import axios from 'axios';
import { useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import InputField from './InputField';

export default function ConfirmPasswordReset() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('page-load');
  const refsAll = useRef([]);

  const [formData, setFormData] = useState({
    email: '',
    created_at: '',
    password: '',
  });
  const { mutate: resetPassword } = useMutation(async (customerData) => {
    const { data } = await axios.post(
      'http://localhost/my-app/src/backend/api/confirm-password.php',
      customerData
    );
    const { status_code } = data;

    if (status_code === 204) {
      setStatus(204);
    }
  });

  const reactQuery = useQuery('check-confirm-page-available', async () => {
    if (!!window.location.search && window.location.href.includes('&')) {
      try {
        const snaitizeUrl = window.location.search.replace('?', '').split('&');
        const urlEmail = atob(snaitizeUrl[0]);
        const urlCreatedAt = atob(snaitizeUrl[1]);

        setFormData({
          email: encodeURIComponent(urlEmail),
          created_at: encodeURIComponent(urlCreatedAt),
          password: '',
        });

        const { data } = await axios.get(
          `http://localhost/my-app/src/backend/api/confirm-password.php?email=${urlEmail}&created_at=${urlCreatedAt}`
        );

        if (data.status_code !== 200) navigate('/', { replace: true });
      } catch (error) {
        navigate('/', { replace: true });
      }
    } else {
      navigate('/', { replace: true });
    }
  });

  const validateForm = () => {
    let canSubmit = true;
    const inputRefsArr = [];

    refsAll.current.forEach((ref) => {
      ref.initDirectReferenceToChild();
      inputRefsArr.push(ref.getElement());
    });

    setTimeout(() => {
      inputRefsArr.forEach((wh) => {
        if (wh.classList.contains('is-invalid')) {
          canSubmit = false;
        }
      });

      if (canSubmit) submitForm();
    });
  };

  const submitForm = () => {
    resetPassword(formData);
  };

  const handleCallback = ({ value, name }) => {
    const keyName = /\[(.*)\]/gi.exec(name);
    if (keyName) {
      if (keyName[1] === 'email') {
        value = encodeURIComponent(value);
      }

      setFormData((prevState) => ({
        ...prevState,
        [keyName[1]]: value,
      }));
    }
  };

  return (
    <div className='register-form m-auto max-w-sm p-4 bg-white'>
      <div className='resigter-form__inner'>
        <div className='register-form__head mb-4'>
          <h2 className='register-form__title text-gray-700 text-xl mb-5'>Reset your password</h2>

          <CSSTransition timeout={400} in={status === 204} classNames='alert' unmountOnExit>
            <p className='input-field__error__text text-green-500  mb-4'>
              Password was changed <br />
              <Link to='/login' className='text-black underline'>
                Login
              </Link>
            </p>
          </CSSTransition>

          <CSSTransition
            timeout={400}
            in={status === 404 || status === 'page-load'}
            classNames='aelrt'
            unmountOnExit
          >
            <p className='mt-3'>Please enter a new password below</p>
          </CSSTransition>
        </div>

        <CSSTransition
          timeout={400}
          classNames='alert'
          unmountOnExit
          in={status === 404 || status === 'page-load'}
        >
          <div className='register-form__body'>
            <div className='register-form__row mb-4'>
              <InputField
                required={true}
                type='password'
                id='password'
                password={true}
                ref={(element) => (refsAll.current[0] = element)}
                parentCallback={handleCallback}
                title='Password'
                error='Password is invalid'
                name='customer[password]'
              />
            </div>

            <div className='register-form__row mb-4'>
              <InputField
                required={true}
                type='password'
                id='password-confirm'
                passwordConfirm={true}
                parentCallback={handleCallback}
                ref={(element) => (refsAll.current[1] = element)}
                title='Confirm password'
                error='Password dont match'
                name='password_confirm'
              />
            </div>

            <div className='register-form__actions'>
              <button onClick={validateForm} className='btn'>
                Reset Password
              </button>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
