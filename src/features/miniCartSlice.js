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
        quantity: 1,
      };
      const cartItemExists = cart.find((x) => x.id === payload.id);

      if (cartItemExists) {
        prepareCartItem.quantity = cartItemExists.quantity + 1;
        fromIndex = cart.findIndex((i) => i.id === payload.id);
        cart.splice(fromIndex, 1, prepareCartItem);
      }

      state.cartItems = cartItemExists ? cart : cart.concat(prepareCartItem);
      Cookies.set('cart_session', JSON.stringify(state.cartItems, { expires: 7 }));
    },

    removeFromCart: (state, { payload }) => {
      let cart = [...state.cartItems].filter((ci) => ci.id !== payload);
      state.cartItems = cart;
    },

    updateQuantity: (state, { payload }) => {
      let quantity = payload.quantity;
      payload.type === 'increment' ? quantity++ : quantity--;

      quantity <= 0
        ? state.cartItems.splice(payload.index, 1)
        : (state.cartItems[payload.index].quantity = quantity);
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close, addToCart, updateQuantity, removeFromCart } = miniCartSlice.actions;

export default miniCartSlice.reducer;
