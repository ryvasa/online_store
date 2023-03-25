import axios from "axios";
import {
  MdSpaceDashboard,
  MdPerson,
  MdStoreMallDirectory,
  MdLocalShipping,
  MdLocalAtm,
  MdOutlineBarChart,
  MdLogout,
  MdChat,
  MdImage,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../redux/userRedux";
const Sidebar = () => {
  const dispatch = useDispatch();
  const handleClick = async (e) => {
    e.preventDefault();
    signOut(dispatch);
  };
  const signOut = async (dispatch) => {
    dispatch(signOutStart());
    try {
      const res = await axios.delete("http://localhost:5000/signout");
      dispatch(signOutSuccess(res.data));
    } catch (error) {
      console.log(error);
      dispatch(signOutFailure());
    }
  };
  return (
    <>
      <div className="flex-1 h-screen border-r-2 hidden lg:block bg-white">
        <div className="flex-col py-5 flex gap-3">
          <Link
            to={"/"}
            className="group flex justify-start gap-2 pl-6 items-center font-medium text-md hover:text-white hover:bg-indigo-600 rounded-md p-2 mx-1"
          >
            <MdSpaceDashboard className="w-6 h-6 text-indigo-700 group-hover:text-white" />
            <span>Dashboard</span>
          </Link>
          <Link
            to={"/statistics"}
            className="group flex justify-start gap-2 pl-6 items-center font-medium text-md hover:text-white hover:bg-indigo-600 rounded-md p-2 mx-1"
          >
            <MdOutlineBarChart className="w-6 h-6 text-indigo-700 group-hover:text-white" />
            <span>Statistics</span>
          </Link>
          <Link
            to={"/transactions"}
            className="group flex justify-start gap-2 pl-6 items-center font-medium text-md hover:text-white hover:bg-indigo-600 rounded-md p-2 mx-1"
          >
            <MdLocalAtm className="w-6 h-6 text-indigo-700 group-hover:text-white" />
            <span>Income</span>
          </Link>
          <Link
            to={"/chat"}
            className="group flex justify-start gap-2 pl-6 items-center font-medium text-md hover:text-white hover:bg-indigo-600 rounded-md p-2 mx-1"
          >
            <MdChat className="w-6 h-6 text-indigo-700 group-hover:text-white" />
            <span>Customer</span>
          </Link>

          <Link
            to={"/users"}
            className="group flex justify-start gap-2 pl-6 items-center font-medium text-md hover:text-white hover:bg-indigo-600 rounded-md p-2 mx-1"
          >
            <MdPerson className="w-6 h-6 text-indigo-700 group-hover:text-white" />
            <span>User</span>
          </Link>
          <Link
            to={"/products"}
            className="group flex justify-start gap-2 pl-6 items-center font-medium text-md hover:text-white hover:bg-indigo-600 rounded-md p-2 mx-1"
          >
            <MdStoreMallDirectory className="w-6 h-6 text-indigo-700 group-hover:text-white" />
            <span>Product</span>
          </Link>
          <Link
            to={"/orders"}
            className="group flex justify-start gap-2 pl-6 items-center font-medium text-md hover:text-white hover:bg-indigo-600 rounded-md p-2 mx-1"
          >
            <MdLocalShipping className="w-6 h-6 text-indigo-700 group-hover:text-white" />
            <span>Order</span>
          </Link>
          <Link
            to={"/slide&preview"}
            className="group flex justify-start gap-2 pl-6 items-center font-medium text-md hover:text-white hover:bg-indigo-600 rounded-md p-2 mx-1"
          >
            <MdImage className="w-6 h-6 text-indigo-700 group-hover:text-white" />
            <span>Slide & Preview</span>
          </Link>
          <button
            onClick={handleClick}
            className="group flex justify-start gap-2 pl-6 items-center font-medium text-md hover:text-white hover:bg-indigo-600 rounded-md p-2 mx-1"
          >
            <MdLogout className="w-6 h-6 text-indigo-700 group-hover:text-white" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
