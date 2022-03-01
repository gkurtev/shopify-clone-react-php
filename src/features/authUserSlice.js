import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: {
    isAuthenticated: Cookies.get('user_session'),
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authUserSlice.actions;

export default authUserSlice.reducer;
