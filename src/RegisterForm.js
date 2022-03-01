import axios from 'axios';
import { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import InputField from './InputField';
import Success from './Success';
export default function RegisterForm(props) {
  const { title } = props;
  const [status, setStatus] = useState('page-load');
  const refsAll = useRef([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const { mutate: addCustomer, isLoading } = useMutation(async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.post('http://localhost/my-app/src/backend/api/api.php', data);
    const { status_code } = response.data;

    setStatus(status_code);
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
    addCustomer(formData);
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
          <h2 className='register-form__title text-center text-gray-700 text-xl mb-5'>{title}</h2>
        </div>

        <CSSTransition timeout={400} in={status === 409} classNames='alert' unmountOnExit>
          <p className='input-field__error__text text-red-400  mb-4'>
            *email was already registered
          </p>
        </CSSTransition>

        <CSSTransition timeout={400} in={status === 201} classNames='alert' unmountOnExit>
          <Success>
            <p className='mh-30 text-green-400 text-2xl'>Successfully registered</p>

            <div className='mt-4'>
              <Link to='/login' className='underline hover:text-blue-500 transition-colors'>
                Login
              </Link>
            </div>
          </Success>
        </CSSTransition>

        <CSSTransition
          timeout={400}
          classNames='alert'
          unmountOnExit
          in={status === 409 || status === 'page-load'}
        >
          <div className='register-form__body'>
            <div className='register-form__row mb-4'>
              <InputField
                required={true}
                type='text'
                ref={(element) => (refsAll.current[0] = element)}
                parentCallback={handleCallback}
                id='first-name'
                title='First name'
                error='First name cannot be blank'
                name='customer[first_name]'
              />
            </div>

            <div className='register-form__row mb-4'>
              <InputField
                required={true}
                type='text'
                ref={(element) => (refsAll.current[1] = element)}
                parentCallback={handleCallback}
                id='last-name'
                title='Last name'
                error='Last name cannot be blank'
                name='customer[last_name]'
              />
            </div>

            <div className='register-form__row mb-4'>
              <InputField
                required={true}
                type='text'
                parentCallback={handleCallback}
                ref={(element) => (refsAll.current[2] = element)}
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
                password={true}
                ref={(element) => (refsAll.current[3] = element)}
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
                ref={(element) => (refsAll.current[4] = element)}
                title='Confirm password'
                error='Password dont match'
                name='password_confirm'
              />
            </div>

            <div className='register-form__actions'>
              <button onClick={validateForm} className='btn'>
                {isLoading ? 'Loading...' : 'Register'}
              </button>

              <div className='mt-3'>
                <Link to='/login' className='underline'>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
