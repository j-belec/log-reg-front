import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    value: false,
    actualUser: {
      name: "",
      username: "",
      email: "",
    },
  },
  reducers: {
    login: (state) => {
      state.value = true;
    },
    logout: (state) => {
      state.value = false;
    },
    setActualUser: (state, action) => {
      state.actualUser = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;

export default configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});
