import { configureStore } from "@reduxjs/toolkit";
import counterSliceReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    counter: counterSliceReducer,
  },
});
