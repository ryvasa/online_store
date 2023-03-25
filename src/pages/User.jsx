import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMaleFemale } from "react-icons/io5";
import {
  MdCall,
  MdDeleteForever,
  MdEmail,
  MdKey,
  MdMode,
  MdPerson,
  MdSupervisedUserCircle,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import { refreshToken } from "../utils/refreshToken";
import { getMe } from "../redux/api";

const User = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${id}`);
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    refreshToken().then(() => {
      getUser();
    });
    console.log(id);
  }, []);
  useEffect(() => {
    console.log(id);
    getMe(dispatch);
  }, []);
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
                src={
                  user.img
                    ? user.img
                    : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                }
                alt=""
                className="w-96 h-96 rounded-full object-cover"
              />
            </div>
            <div className="flex w-full justify-center py-5">
              <div className="flex w-full px-5 gap-2">
                <div className="flex-1">
                  <ul className="flex pl-20 gap-3 flex-col">
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
                    <li>{user.uuid}</li>
                    <li>{user.name}</li>
                    <li>{user.email}</li>
                    <li>{user.phone}</li>
                    <li>{user.role}</li>
                    <li>{user.gender}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex w-full px-10 pt-5 justify-between">
              <div className="flex-1 w-full flex  justify-start">
                <Link
                  to={`/users/${user.uuid}/edit`}
                  className="flex gap-3 w-3/4 items-center justify-center rounded-md border-none bg-green-500 p-3 text-base font-medium text-white shadow-xl hover:bg-green-600"
                >
                  <MdMode />
                  <span>Edit User</span>
                </Link>
              </div>
              <div className="flex-1 w-full flex  justify-end">
                <Link
                  to={"/users/:id"}
                  className="flex gap-3 w-3/4 items-center justify-center rounded-md border-none bg-red-600 p-3 text-base font-medium text-white shadow-xl hover:bg-red-700"
                >
                  <MdDeleteForever />
                  <span>Delete User</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default User;
