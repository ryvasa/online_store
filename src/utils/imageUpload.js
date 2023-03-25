import axios from "axios";
import { refreshToken } from "../utils/refreshToken";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "./firebase";

export const handleClickUpdate = (endpoint, file, id, inputs, callback) => {
  console.log({ endpoint, file, id, inputs });
  refreshToken().then(async () => {
    if (!file) {
      try {
        const response = await axios.put(
          `http://localhost:5000/${endpoint}/${id}`,
          {
            ...inputs,
          }
        );

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
              `http://localhost:5000/${endpoint}/${id}`,
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
export const handleClickAdd = (endpoint, file, inputs, callback) => {
  console.log({ endpoint, file, inputs });
  refreshToken().then(async () => {
    if (!file) {
      try {
        const response = await axios.post(`http://localhost:5000/${endpoint}`, {
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
            const response = await axios.post(
              `http://localhost:5000/${endpoint}`,
              data
            );
            callback(response); // panggil callback function;
            console.log(response);
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  });
};

export const handleClickAddProduct = (endpoint, files, inputs, callback) => {
  console.log({ endpoint, files, inputs });
  refreshToken().then(async () => {
    if (!files || files.length === 0) {
      try {
        const response = await axios.post(`http://localhost:5000/${endpoint}`, {
          ...inputs,
        });

        console.log(response);
        callback(response); // panggil callback function;
      } catch (error) {
        console.log(error);
      }
    } else {
      const fileUrls = [];
      const uploadPromises = files.map((file) => {
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
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
              reject(error);
            },
            async () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              fileUrls.push(downloadURL);
              resolve(downloadURL);
            }
          );
        });
      });

      Promise.all(uploadPromises)
        .then(async () => {
          try {
            const data = { ...inputs, img: fileUrls };
            const response = await axios.post(
              `http://localhost:5000/${endpoint}`,
              data
            );
            callback(response); // panggil callback function;
            console.log(response);
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => console.log(error));
    }
  });
};

export const handleClickUpdateProduct = (
  endpoint,
  files,
  inputs,
  callback,
  id,
  stock
) => {
  console.log({ endpoint, files, inputs });
  refreshToken().then(async () => {
    if (!files || files.length === 0) {
      try {
        console.log({ stock });
        if (stock.length !== 0) {
          stock.map(async (s) => {
            const stock = await axios.post(
              `http://localhost:5000/stock/${id}`,
              s
            );
            console.log(stock);
          });
        }
        const response = await axios.put(
          `http://localhost:5000/${endpoint}/${id}`,
          {
            ...inputs,
          }
        );

        console.log(response);
        callback(response); // panggil callback function;
      } catch (error) {
        console.log(error);
      }
    } else {
      const fileUrls = [];
      const uploadPromises = files.map((file) => {
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
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
              reject(error);
            },
            async () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              fileUrls.push(downloadURL);
              resolve(downloadURL);
            }
          );
        });
      });

      Promise.all(uploadPromises)
        .then(async () => {
          try {
            console.log({ stock });
            if (stock.length !== 0) {
              stock.map(async (s) => {
                const stock = await axios.post(
                  `http://localhost:5000/stock/${id}`,
                  s
                );
                console.log(stock);
              });
            }
            const data = { ...inputs, img: fileUrls };
            const response = await axios.put(
              `http://localhost:5000/${endpoint}/${id}`,
              data
            );
            callback(response); // panggil callback function;
            console.log(response);
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => console.log(error));
    }
  });
};

export const handleClickUpdateSlide = (file, callback, uuid, inputs) => {
  refreshToken().then(async () => {
    if (!file) {
      try {
        const response = await axios.put(
          `http://localhost:5000/slide/${uuid}`,
          {
            ...inputs,
          }
        );
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
              `http://localhost:5000/slide/${uuid}`,
              data
            );
            callback(response); // panggil callback function;
            console.log(response);
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  });
};
