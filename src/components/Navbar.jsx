import { Link } from "react-router-dom";
import { MdPerson, MdLogout } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="navbar shadow-lg fixed top-0 left-0 z-[90] h-5 bg-white">
      <div className="flex-1">
        <Link
          to={"/"}
          className="btn btn-ghost normal-case text-xl bg-indigo-600 text-white"
        >
          NTStore
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full border-2 shadow-sm p-1 border-indigo-600">
              <img src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={"/profile"}>
                <MdPerson className="lg:h-6 lg:w-6 h-4 w-4 text-indigo-700" />
                Profile
              </Link>
            </li>
            <li>
              <Link to={"/signin"}>
                <MdLogout className="lg:h-6 lg:w-6 h-4 w-4 text-indigo-700" />
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
