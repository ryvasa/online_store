import {
  IoBagHandle,
  IoLogOut,
  IoPersonCircle,
  IoSearchSharp,
  IoStorefrontSharp,
  IoHome,
  IoLogIn,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { refreshToken } from "../utils/refreshToken";
import Cart from "./Cart";
import Chat from "./Chat";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const Navbar = () => {
  const [user, setUser] = useState({});
  const data = JSON.parse(localStorage.getItem("user"));
  const signOut = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/signout/${data.uuid}`
      );
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = (e) => {
  
      signOut();
 
  };
  useEffect(() => {
    setUser(data);
  }, []);
  return (
    <div className="navbar bg-base-100 w-full fixed shadow-lg z-[90]">
      <div className="navbar-start">
        <div className="lg:flex hidden items-center gap-2">
          <Chat type={"desktop"} />
        </div>
        <div className="lg:hidden ">
          <div className="dropdown dropdown-start">
            <label
              tabIndex={0}
              className="btn bg-teal-600 hover:bg-teal-600 btn-sm border-none text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="rounded-lg w-full group ">
                <Link
                  to={"/products"}
                  className="group-hover:text-white group-hover:bg-teal-600"
                >
                  <IoStorefrontSharp className="w-5 h-5 text-teal-600 group-hover:text-white " />
                  <span className="normal-case">Products</span>
                </Link>
              </li>
              <li className="rounded-lg w-full group ">
                <Link
                  to={"/orders"}
                  className="group-hover:text-white group-hover:bg-teal-600"
                >
                  <IoBagHandle className="w-5 h-5 text-teal-600 group-hover:text-white " />
                  <span className="normal-case">Your Orders</span>
                </Link>
              </li>
              <li className="rounded-lg w-full group ">
                <Chat type={"mobile"} />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="navbar-center">
        <Link
          to={"/"}
          className="btn btn-ghost btn-sm hover:bg-teal-600 hover:text-white normal-case text-xl"
        >
          NTStore
        </Link>
      </div>
      <div className="navbar-end">
        <div className="hidden lg:flex gap-1">
          <div className="group">
            <Link
              to={"/"}
              className="btn btn-ghost btn-sm rounded-full group-hover:bg-teal-600 group-hover:text-white flex gap-1  items-center "
            >
              <IoHome className="w-6 h-6 text-teal-600 group-hover:text-white " />
              <span className="normal-case  group-hover:block ">Home</span>
            </Link>
          </div>
          <div className="group">
            <Link
              to={"/products"}
              className="btn btn-ghost btn-sm rounded-full group-hover:bg-teal-600 group-hover:text-white flex gap-1  items-center "
            >
              <IoStorefrontSharp className="w-6 h-6 text-teal-600 group-hover:text-white " />
              <span className="normal-case  group-hover:block ">Products</span>
            </Link>
          </div>

          {user ? (
            <>
              <div className="group">
                <Link
                  to={"/orders"}
                  className="btn btn-ghost btn-sm rounded-full group-hover:bg-teal-600 group-hover:text-white flex gap-1  items-center "
                >
                  <IoBagHandle className="w-6 h-6 text-teal-600 group-hover:text-white " />
                  <span className="normal-case  group-hover:block ">
                    Your Orders
                  </span>
                </Link>
              </div>
              <Cart />
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-sm btn-circle avatar"
                >
                  <div className="w-8 rounded-full">
                    <img
                      src={
                        user && user.img
                          ? user.img
                          : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                      }
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to={"/profile"}>
                      <IoPersonCircle className="h-6 w-6 text-teal-600" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleClick}>
                      <IoLogOut className="h-6 w-6 text-teal-600" />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="group ">
                <Link
                  to={"/signup"}
                  className="btn btn-ghost btn-sm border-2 border-teal-600 rounded-full group-hover:bg-teal-600 group-hover:text-white flex gap-1  items-center "
                >
                  <IoPersonCircle className="w-6 h-6 text-teal-600 group-hover:text-white " />
                  <span className="normal-case  group-hover:block ">
                    Sign Up
                  </span>
                </Link>
              </div>
              <div className="group">
                <Link
                  to={"/signin"}
                  className="btn  btn-ghost btn-sm border-2 border-transparent hover:border-teal-600 bg-teal-600 text-white  rounded-full group-hover:text-teal-600 group-hover:bg-white flex gap-1  items-center "
                >
                  <IoLogIn className="w-6 h-6 text-white group-hover:text-teal-600 " />
                  <span className="normal-case  group-hover:block ">
                    Sign In
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
