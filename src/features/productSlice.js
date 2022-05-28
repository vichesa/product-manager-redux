import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    const response = await axios.get(
      'https://60cb2f6921337e0017e440a0.mockapi.io/product'
    );
    return response.data;
  }
);

export const saveProducts = createAsyncThunk(
  'products/saveProducts',
  async ({ name, qty, picture, expiredAt, isActive, id }) => {
    const response = await axios.post(
      'https://60cb2f6921337e0017e440a0.mockapi.io/product',
      { name, qty, picture, expiredAt, isActive, id }
    );
    return response.data;
  }
);

const productEntity = createEntityAdapter({
  selectId: (product) => product.id,
});

const productSlice = createSlice({
  name: 'product',
  initialState: productEntity.getInitialState(),
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      productEntity.setAll(state, action.payload);
    },
    [saveProducts.fulfilled]: (state, action) => {
      productEntity.addOne(state, action.payload);
    },
  },
});

export const productSelector = productEntity.getSelectors(
  (state) => state.product
);

export default productSlice.reducer;
