import axios from "axios";
import { refreshToken } from "./refreshToken";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "./firebase";

export const handleClickUpdate = (file, id, inputs, callback) => {
  refreshToken().then(async () => {
    if (!file) {
      try {
        const response = await axios.put(`http://localhost:5000/users/${id}`, {
          ...inputs,
        });

        console.log(response);
        callback(response); // panggil callback function;
      } catch (error) {
        console.log(error);
      }
    } else {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        async () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          try {
            const data = { ...inputs, img: downloadURL };
            const response = await axios.put(
              `http://localhost:5000/users/${id}`,
              data
            );
            callback(response); // panggil callback function;

            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  });
};
