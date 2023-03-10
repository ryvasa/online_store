import {
  MdSpaceDashboard,
  MdPerson,
  MdStoreMallDirectory,
  MdLocalShipping,
  MdLocalAtm,
  MdOutlineBarChart,
  MdLogout,
  MdChat,
} from "react-icons/md";
import { Link } from "react-router-dom";
const Sidebar = () => {
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
            to={"/income"}
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
          <Link className="group flex justify-start gap-2 pl-6 items-center font-medium text-md hover:text-white hover:bg-indigo-600 rounded-md p-2 mx-1">
            <MdLogout className="w-6 h-6 text-indigo-700 group-hover:text-white" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
