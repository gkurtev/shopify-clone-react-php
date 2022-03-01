import axios from 'axios';
import Cookies from 'js-cookie';
import { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { login } from './features/authUserSlice';
import InputField from './InputField';

export default function Login() {
  const refsAll = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState('page-load');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { mutate: loginCustomer, isLoading } = useMutation(async (customerData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { data } = await axios.post(
      'http://localhost/my-app/src/backend/api/login.php',
      customerData
    );
    const { customer_data, status_code } = data;

    setStatus(status_code);

    if (status_code === 200) {
      // success user found
      Cookies.set('user_session', JSON.stringify(customer_data), { expires: 7 });
      dispatch(login());
      navigate('/account', { replace: true });
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
    loginCustomer(formData);
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
        <div className='register-form__head'>
          <h2 className='register-form__title text-center text-gray-700 text-xl mb-5'>Login</h2>
        </div>

        <CSSTransition timeout={400} in={status === 401} classNames='alert' unmountOnExit>
          <p className='input-field__error__text text-red-400  mb-4'>
            *email or password is incorrect
          </p>
        </CSSTransition>

        <div className='register-form__body'>
          <div className='register-form__row mb-4'>
            <InputField
              required={true}
              type='text'
              parentCallback={handleCallback}
              ref={(element) => (refsAll.current[0] = element)}
              id='email'
              title='Emaill address'
              error='Emaill address invalid'
              name='customer[email]'
            />
          </div>

          <div className='register-form__row mb-4'>
            <InputField
              required={true}
              type='password'
              id='password'
              ref={(element) => (refsAll.current[1] = element)}
              parentCallback={handleCallback}
              title='Password'
              error='Password is invalid'
              name='customer[password]'
            />
          </div>

          <div className='register-form__actions'>
            <button className='btn' onClick={validateForm}>
              {isLoading ? 'Loading...' : 'Login'}
            </button>

            <div className='mt-3'>
              <Link to='/register' className='underline'>
                Create account
              </Link>
            </div>

            <div className='mt-3'>
              <Link to='/reset-password' className='underline'>
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
