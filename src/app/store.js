import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from '../features/authUserSlice';
import miniCartReducer from '../features/miniCartSlice';

export default configureStore({
  reducer: {
    miniCart: miniCartReducer,
    authUser: authUserReducer,
  },
});
