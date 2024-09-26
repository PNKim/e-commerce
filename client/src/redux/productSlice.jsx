import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {
    getProduct: (state, { payload }) => {
      state.products = payload;
    },
  },
});

export const { getProduct } = productSlice.actions;
export default productSlice.reducer;
