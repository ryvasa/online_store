import React from "react";
import {
  MdCall,
  MdEmail,
  MdImage,
  MdKey,
  MdOutlineUpload,
  MdPerson,
  MdSupervisedUserCircle,
} from "react-icons/md";
import { IoMaleFemale } from "react-icons/io5";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

const EditUser = () => {
  return (
    <Layout>
      <div className="flex-[5] overflow-y-auto relative pt-3 w-full h-screen flex-col flex pb-16 bg-gradient-to-b from-white to-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute top-0"
        >
          <path
            fill="#4F46E5"
            fill-opacity="1"
            d="M0,128L0,256L102.9,256L102.9,288L205.7,288L205.7,128L308.6,128L308.6,192L411.4,192L411.4,288L514.3,288L514.3,320L617.1,320L617.1,224L720,224L720,128L822.9,128L822.9,96L925.7,96L925.7,256L1028.6,256L1028.6,192L1131.4,192L1131.4,224L1234.3,224L1234.3,96L1337.1,96L1337.1,288L1440,288L1440,0L1337.1,0L1337.1,0L1234.3,0L1234.3,0L1131.4,0L1131.4,0L1028.6,0L1028.6,0L925.7,0L925.7,0L822.9,0L822.9,0L720,0L720,0L617.1,0L617.1,0L514.3,0L514.3,0L411.4,0L411.4,0L308.6,0L308.6,0L205.7,0L205.7,0L102.9,0L102.9,0L0,0L0,0Z"
          ></path>
        </svg>
        <div className=" justify-center flex w-full relative z-[2]">
          <div className="flex flex-col w-3/5 justify-center py-8 mb-5 border rounded-lg bg-white shadow-lg">
            <div className="flex  w-full justify-center">
              <img
                src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                alt=""
                className="w-96 h-96 rounded-full object-cover"
              />
            </div>
            <div className="flex w-full px-10 py-5 justify-center">
              <div className="flex-1 w-full flex  justify-center">
                <button className="flex gap-1 btn btn-sm justify-center border-none bg-indigo-600  text-white shadow-xl hover:bg-indigo-600">
                  <MdImage />
                  <span>Change Picture</span>
                </button>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <div className="flex w-1/2 gap-2">
                <div className="flex-1">
                  <ul className="flex gap-3 flex-col">
                    <li>
                      <div className="flex border-b border-transparent justify-between">
                        <span className="flex gap-1">
                          <MdKey className="h-5 w-5 text-indigo-600" /> ID
                        </span>
                        <span>:</span>
                      </div>
                    </li>
                    <li>
                      <div className="flex border-b border-transparent justify-between">
                        <span className="flex gap-1">
                          <MdPerson className="h-5 w-5 text-indigo-600" />{" "}
                          Username
                        </span>
                        <span>:</span>
                      </div>
                    </li>
                    <li>
                      <div className="flex border-b border-transparent justify-between">
                        <span className="flex gap-1">
                          <MdEmail className="h-5 w-5 text-indigo-600" /> Email
                        </span>
                        <span>:</span>
                      </div>
                    </li>
                    <li>
                      <div className="flex border-b border-transparent justify-between">
                        <span className="flex gap-1">
                          <MdCall className="h-5 w-5 text-indigo-600" /> Phone
                        </span>
                        <span>:</span>
                      </div>
                    </li>
                    <li>
                      <div className="flex border-b border-transparent justify-between">
                        <span className="flex gap-1">
                          <MdSupervisedUserCircle className="h-5 w-5 text-indigo-600" />{" "}
                          Role
                        </span>
                        <span>:</span>
                      </div>
                    </li>
                    <li>
                      <div className="flex border-b border-transparent justify-between">
                        <span className="flex gap-1">
                          <IoMaleFemale className="h-5 w-5 text-indigo-600" />{" "}
                          Gender
                        </span>
                        <span>:</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="flex-1">
                  <ul className="flex gap-3 flex-col">
                    <li>ID</li>
                    <li>
                      <input
                        type="text"
                        placeholder="Username"
                        className="bg-transparent outline-none border-b"
                      />
                    </li>
                    <li>
                      <input
                        type="email"
                        placeholder="Email"
                        className="bg-transparent outline-none border-b"
                      />
                    </li>
                    <li>
                      <input
                        type="number"
                        placeholder="Phone"
                        className="bg-transparent outline-none border-b"
                      />
                    </li>
                    <li>
                      <input
                        type="text"
                        placeholder="Role"
                        className="bg-transparent outline-none border-b"
                      />
                    </li>
                    <li>
                      <input
                        type="text"
                        placeholder="Gender"
                        className="bg-transparent outline-none border-b"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex w-full px-10 pt-5 justify-center">
              <button className="flex gap-1 border-none bg-indigo-600 p-3 btn font-medium text-white shadow-xl hover:bg-indigo-600">
                <MdOutlineUpload className="h-5 w-5" />
                <span>Update</span>
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default EditUser;
