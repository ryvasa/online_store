import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    alertStatus: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    //alert
    alertStart: (state) => {
      state.isFetching = true;
    },
    alertSuccess: (state, action) => {
      state.isFetching = false;
      state.alertStatus = action.payload;
    },
    alertFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { alertStart, alertSuccess, alertFailure } = alertSlice.actions;
export default alertSlice.reducer;
