import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoCall, IoMail, IoMaleFemale, IoPersonCircle } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="w-full bg-gradient-to-b from-white to-gray-100 h-screen pt-10 relative">
        <Link
          to={"/profile/:id"}
          className="absolute lg:top-20 lg:right-5 top-[70px] right-3 z-10"
        >
          <div className="tooltip tooltip-left" data-tip="edit profile">
            <IoMdSettings className="w-8 h-8 text-white" />
          </div>
        </Link>{" "}
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
        <div className="w-full flex justify-center items-center relative h-screen">
          <div className="border-2 bg-white mx-10 shadow-xl rounded-lg p-5 gap-5 lg:flex lg:flex-row flex-col justify-center w-full">
            <div className="lg:flex-1 "></div>
            <div className="flg:lex-[2] flex justify-center">
              <img
                src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                alt=""
                className="rounded-full shadow-lg h-60 w-60 border-2"
              />
            </div>
            <div className="lg:flex-[3] flex w-full h-full justify-center items-center py-10 gap-5">
              <div className="flex justify-between w-4/5">
                <div className="flex-1 p-1 lg:p-3">
                  <ul className="flex-col gap-2 lg:gap-5 flex">
                    <li className="lg:font-medium lg:text-md font-light text-sm flex gap-1 items-center">
                      <IoPersonCircle className="text-teal-600 w-4 h-4 lg:w-6 lg:h-6" />
                      <span>Username</span>
                    </li>
                    <li className="lg:font-medium lg:text-md font-light text-sm flex gap-1 items-center">
                      <IoMail className="text-teal-600 w-4 h-4 lg:w-5 lg:h-5" />
                      <span>Email</span>
                    </li>
                    <li className="lg:font-medium lg:text-md font-light text-sm flex gap-1 items-center">
                      <IoCall className="text-teal-600 w-4 h-4 lg:w-5 lg:h-5" />
                      <span>Phone</span>
                    </li>
                    <li className="lg:font-medium lg:text-md font-light text-sm flex gap-1 items-center">
                      <IoMaleFemale className="text-teal-600 w-4 h-4 lg:w-6 lg:h-6" />
                      <span>Gender</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1 p-1 lg:p-3">
                  <ul className="flex-col lg:gap-5 gap-2 flex">
                    <li className="lg:font-medium lg:text-md font-light text-sm">
                      : Username
                    </li>
                    <li className="lg:font-medium lg:text-md font-light text-sm">
                      : Email
                    </li>
                    <li className="lg:font-medium lg:text-md font-light text-sm">
                      : Phone
                    </li>
                    <li className="lg:font-medium lg:text-md font-light text-sm">
                      : Gender
                    </li>
                  </ul>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
