import { configureStore } from "@reduxjs/toolkit";
import counterSliceReducer from "./authSlice";
import productSliceReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    counter: counterSliceReducer,
    product: productSliceReducer,
  },
});
