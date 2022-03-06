import { createSlice } from '@reduxjs/toolkit';
import { batchVariants } from '../helpers/helpers';

const productAdminSlice = createSlice({
  name: 'productCreate',
  initialState: {
    product: {
      title: '',
      // options: [
      //   {
      //     name: '',
      //     values: [],
      //   },
      // ],
      collection: 'none',
      variants: [
        {
          title: 'Default Title',
          price: '',
          available: false,
          quantity: '',
        },
      ],
    },
  },
  reducers: {
    saveOptions: (state, { payload }) => {
      if (Object.keys(payload)[0] === 'options') {
        const { options } = payload;
        let variantsArr = [
          {
            title: 'Default Title',
            price: '',
            available: false,
            quantity: '',
          },
        ];

        state.product.options
          ? (state.product.options[options.position] = options)
          : (state.product.options = [payload.options]);

        if (state.product.options) {
          if (state.product.options.length > 1) {
            batchVariants([
              state.product.options[0].values,
              state.product.options[1].values,
            ]).forEach((x, i) => {
              variantsArr[i] = {
                title: x,
                price: state.product.variants[i] ? state.product.variants[i].price : '',
                quantity: state.product.variants[i] ? state.product.variants[i].quantity : '',
              };
            });
          } else {
            variantsArr = state.product.options[0].values.map((opt, i) => ({
              title: opt,
              price: state.product.variants[i] ? state.product.variants[i].price : '',
              quantity: state.product.variants[i] ? state.product.variants[i].quantity : '',
            }));
          }
        }

        state.product.variants = variantsArr;
      }
    },

    savePrice: (state, { payload }) => {
      state.product.variants[payload.index].price = payload.value;
    },

    saveQuantity: (state, { payload }) => {
      state.product.variants[payload.index].quantity = payload.value;
    },

    saveTitle: (state, { payload }) => {
      state.product.title = payload;
    },

    saveCollection: (state, { payload }) => {
      console.log(payload);
      state.product.collection = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveTitle, saveCollection, saveOptions, savePrice, saveQuantity } =
  productAdminSlice.actions;

export default productAdminSlice.reducer;
