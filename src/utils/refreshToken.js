import axios from "axios";
import jwt_decode from "jwt-decode";

export const refreshToken = async () => {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    if (decoded.exp * 1000 <= Date.now()) {
      const res = await axios.get(`http://localhost:5000/token/${decoded.id}`);
      localStorage.setItem("token", JSON.stringify(res.data.token));
      return;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
