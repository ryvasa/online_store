import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //getMe
    getMeStart: (state) => {
      state.isFetching = true;
    },
    getMeSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    getMeFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // LOGUT
    signOutStart: (state) => {
      state.isFetching = true;
    },
    signOutSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null;
    },

    signOutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getMeStart,
  getMeSuccess,
  getMeFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} = userSlice.actions;
export default userSlice.reducer;
