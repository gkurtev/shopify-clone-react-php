import { createContext } from 'react';

export const Passwords = createContext({
  password1: '',
  password2: '',
});

export const authContext = createContext({
  authenticated: false,
  setAuthenticated: (auth) => {},
});
