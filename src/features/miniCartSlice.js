import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const miniCartSlice = createSlice({
  name: 'miniCart',
  initialState: {
    isOpen: false,
    cartItems: Cookies.get('cart_session') ? JSON.parse(Cookies.get('cart_session')) : [],
  },
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },

    close: (state) => {
      state.isOpen = false;
    },

    addToCart: (state, { payload }) => {
      let cart = [...state.cartItems];
      let fromIndex = -1;
      let prepareCartItem = {
        ...payload,
        line: cart.length,
        quantity: 1,
      };
      const cartItemExists = cart.find((x) => x.id === payload.id);

      if (cartItemExists) {
        prepareCartItem.quantity = cartItemExists.quantity + 1;
        prepareCartItem.line = cartItemExists.line;
        fromIndex = cart.findIndex((i) => i.id === payload.id);
        cart.splice(fromIndex, 1, prepareCartItem);
      }

      state.cartItems = cartItemExists ? cart : cart.concat(prepareCartItem);
      Cookies.set('cart_session', JSON.stringify(state.cartItems));
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close, addToCart } = miniCartSlice.actions;

export default miniCartSlice.reducer;
