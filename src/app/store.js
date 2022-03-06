import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from '../features/authUserSlice';
import miniCartReducer from '../features/miniCartSlice';
import productAdminReducer from '../features/productAdminSlice';

export default configureStore({
  reducer: {
    miniCart: miniCartReducer,
    authUser: authUserReducer,
    productCreate: productAdminReducer,
  },
});
