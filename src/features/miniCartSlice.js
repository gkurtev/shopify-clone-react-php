import { createSlice } from '@reduxjs/toolkit';

const miniCartSlice = createSlice({
  name: 'miniCart',
  initialState: {
    isOpen: false,
    testWhatever: false,
  },
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },

    close: (state) => {
      state.isOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close } = miniCartSlice.actions;

export default miniCartSlice.reducer;
