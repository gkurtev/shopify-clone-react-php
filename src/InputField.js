import { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Passwords } from './contexts';

function InputField(
  { name, required, type, id, title, error, parentCallback, password, passwordConfirm },
  ref
) {
  const [valid, setValid] = useState(true);
  const [value, setValue] = useState('');
  const inputRef = useRef();
  const validPasswords = useContext(Passwords);

  useImperativeHandle(ref, () => ({
    initDirectReferenceToChild: () => {
      validate();
    },
    getElement: () => {
      return inputRef.current;
    },
  }));

  const handleChange = (event) => {
    // validate
    setValue(event.target.value);
    setValid(true);
    parentCallback({ value: event.target.value, name });

    if (password) {
      validPasswords.password1 = value;
    }

    if (passwordConfirm) {
      validPasswords.password2 = value;
    }
  };

  const validate = () => {
    if (password || passwordConfirm) {
      setValid(
        validPasswords.password1 === validPasswords.password2 &&
          validPasswords.password1.length > 0 &&
          validPasswords.password2.length > 0
      );
    } else {
      setValid(value.length > 0);
    }
  };

  return (
    <div
      className={`input-field ${valid ? '' : 'is-invalid'}`}
      data-required={required}
      ref={inputRef}
    >
      <div className='input-field__controls'>
        <label htmlFor={id} className='hidden'>
          {title}
        </label>

        <input
          type={type}
          name={name}
          placeholder={title}
          onChange={(e) => handleChange(e)}
          className={`appearance-none border-morder py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            valid ? '' : 'border-red-500'
          }`}
          id={id}
        />
      </div>

      <CSSTransition in={!valid} className='alert' timeout={400} unmountOnExit>
        <div className='input-field__error'>
          <p className='input-field__error__text text-red-400  mt-2'>{error}</p>
        </div>
      </CSSTransition>
    </div>
  );
}

export default forwardRef(InputField);
