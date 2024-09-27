import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    searchProduct: "",
  },
  reducers: {
    getProduct: (state, { payload }) => {
      state.products = payload;
    },
    setSearchProduct: (state, { payload }) => {
      state.searchProduct = payload;
    },
  },
});

export const { getProduct, setSearchProduct } = productSlice.actions;
export default productSlice.reducer;
