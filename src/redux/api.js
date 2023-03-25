import {
  getMeFailure,
  getMeStart,
  getMeSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "./userRedux";
import axios from "axios";
import jwt_decode from "jwt-decode";
export const getMe = async (dispatch) => {
  dispatch(getMeStart());
  try {
    const res = await axios.get("http://localhost:5000/me");
    dispatch(getMeSuccess(res.data));
  } catch (error) {
    dispatch(getMeFailure());
  }
};

export const signOut = async (dispatch) => {
  dispatch(signOutStart());
  try {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const res = await axios.delete(
      `http://localhost:5000/signout/${decoded.id}`
    );
    dispatch(signOutSuccess(res.data));
  } catch (error) {
    dispatch(signOutFailure());
  }
};
