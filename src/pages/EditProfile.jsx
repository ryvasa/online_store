import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  IoCall,
  IoImage,
  IoKey,
  IoKeyOutline,
  IoMail,
  IoMaleFemale,
  IoPersonCircle,
} from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { handleClickUpdate } from "../utils/imageUpload";
import { refreshToken } from "../utils/refreshToken";

const EditProfile = () => {
  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState({});
  const [preview, setPreview] = useState("");
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    handleClickUpdate(file, id, inputs, handleCallback);
  };
  const handleCallback = (response) => {
    navigate("/profile");
  };
  useEffect(() => {
    refreshToken().then(() => {
      getUser();
    });
  }, []);
  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <>
      <Navbar />
      <div className="py-20 flex justify-center  bg-gradient-to-b from-white to-gray-100 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute top-16"
        >
          <path
            fill="#0D9488"
            fill-opacity="1"
            d="M0,32L26.7,42.7C53.3,53,107,75,160,117.3C213.3,160,267,224,320,245.3C373.3,267,427,245,480,218.7C533.3,192,587,160,640,154.7C693.3,149,747,171,800,192C853.3,213,907,235,960,250.7C1013.3,267,1067,277,1120,272C1173.3,267,1227,245,1280,250.7C1333.3,256,1387,288,1413,304L1440,320L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
          ></path>
        </svg>
        <div className="flex flex-col justify-center lg:w-3/5 w-full border-2 rounded-lg shadow-lg  relative bg-white">
          <div className="p-5 flex justify-center w-full">
            <img
              src={
                preview
                  ? preview
                  : user.img
                  ? user.img
                  : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="object-cover w-72 h-72 rounded-sm"
            />
          </div>
          <span className="text-lg font-semibold text-center py-2">
            ID : {user.uuid}
          </span>
          <div className="flex justify-center py-3">
            <input
              type="file"
              onChange={loadImage}
              id="img"
              style={{ display: "none" }}
            />
            <label
              htmlFor="img"
              className="btn btn-sm bg-teal-600 hover:bg-teal-500 border-none text-white flex gap-1 items-center"
            >
              {" "}
              <IoImage className="w-4 h-4" />
              <span>Change Picture</span>
            </label>
          </div>
          <div className="flex w-full justify-center py-3">
            <div className="flex lg:w-3/5 w-full px-2 justify-center">
              <div className="flex-1">
                <ul className="flex-col lg:gap-5 gap-2 flex">
                  <li className="pr-1 lg:font-medium lg:text-md flex gap-1 items-center justify-end lg:justify-start font-light text-sm ">
                    <IoPersonCircle className="text-teal-600 w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="">Username</span>
                  </li>
                  <li className="pr-1 lg:font-medium lg:text-md flex gap-1 items-center justify-end lg:justify-start font-light text-sm">
                    <IoMail className="text-teal-600 lg:w-5 lg:h-5 h-4 w-4" />
                    <span className="">Email</span>
                  </li>
                  <li className="pr-1 lg:font-medium lg:text-md flex gap-1 items-center justify-end lg:justify-start font-light text-sm">
                    <IoCall className="text-teal-600 lg:w-5 lg:h-5 h-4 w-4" />
                    <span className="">Phone</span>
                  </li>
                  <li className="pr-1 lg:font-medium lg:text-md flex gap-1 items-center justify-end lg:justify-start font-light text-sm">
                    <IoMaleFemale className="text-teal-600 w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="">Gender</span>
                  </li>
                  <li className="pr-1 lg:font-medium lg:text-md flex gap-1 items-center justify-end lg:justify-start font-light text-sm">
                    <IoKey className="text-teal-600 w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="">Current Password</span>
                  </li>
                  <li className="pr-1 lg:font-medium lg:text-md flex gap-1 items-center justify-end lg:justify-start font-light text-sm">
                    <IoKeyOutline className="text-teal-600 w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="">New Password</span>
                  </li>
                  <li className="pr-1 lg:font-medium lg:text-md flex gap-1 items-center justify-end lg:justify-start font-light text-sm">
                    <IoKeyOutline className="text-teal-600 w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="">Confirm New Password</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 ">
                <ul className="flex-col lg:gap-5 gap-2 flex">
                  <li className="lg:font-medium lg:text-md font-light text-sm">
                    :{" "}
                    <input
                      type="text"
                      placeholder={user.name}
                      className="bg-transparent outline-none"
                    />
                  </li>
                  <li className="lg:font-medium lg:text-md font-light text-sm">
                    :{" "}
                    <input
                      type="email"
                      placeholder={user.email}
                      className="bg-transparent outline-none"
                    />
                  </li>
                  <li className="lg:font-medium lg:text-md font-light text-sm">
                    :{" "}
                    <input
                      type="number"
                      placeholder={user.phone}
                      className="bg-transparent outline-none"
                    />
                  </li>
                  <li className="lg:font-medium lg:text-md font-light text-sm">
                    :{" "}
                    <select
                      onChange={handleChange}
                      name="gender"
                      className="bg-transparent outline-none"
                    >
                      <option selected value={user.gender}>
                        {user.gender}
                      </option>
                      {user.gender === "mele" ? (
                        <option value={"male"}>male</option>
                      ) : (
                        <option value={"female"}>female</option>
                      )}
                    </select>
                  </li>
                  <li className="lg:font-medium lg:text-md font-light text-sm">
                    :{" "}
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="bg-transparent outline-none"
                    />
                  </li>
                  <li className="lg:font-medium lg:text-md font-light text-sm">
                    :{" "}
                    <input
                      type="password"
                      placeholder="New Password"
                      className="bg-transparent outline-none"
                    />
                  </li>
                  <li className="lg:font-medium lg:text-md font-light text-sm">
                    :{" "}
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="bg-transparent outline-none"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center py-10 items-center">
            <button
              onClick={handleClick}
              className="btn border-none bg-teal-600 hover:bg-teal-600 text-white"
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
