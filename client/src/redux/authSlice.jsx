import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    seenLogin: false,
    seenRegister: false,
    status: {
      loading: null,
      error: null,
      user: null,
    },
    isToken: Boolean(window.localStorage.getItem("token")),
  },
  reducers: {
    buttonLogin: (state) => {
      state.seenLogin = !state.seenLogin;
    },
    buttonRegister: (state) => {
      state.seenRegister = !state.seenRegister;
    },
    setState: (state, { payload }) => {
      state.status = { ...state.status, ...payload };
      state.isToken = Boolean(window.localStorage.getItem("token"));
    },
  },
});

export const { buttonLogin, buttonRegister, setState } = counterSlice.actions;
export default counterSlice.reducer;
