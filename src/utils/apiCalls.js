import axios from "axios";

export const getData = async (path, search, page, callback) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/${path}?search=${search}&page=${page}`
    );
    callback(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async (path, id, callback) => {
  try {
    const response = await axios.delete(`http://localhost:5000/${path}`);
    callback(response);
  } catch (error) {
    console.log(error);
  }
};
