import { Link, useNavigate } from "react-router-dom";
import { MdPerson, MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../redux/userRedux";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  if (!user) {
    navigate("/signin");
    return;
  }
  const dispatch = useDispatch();
  const handleClick = async (e) => {
    e.preventDefault();
    signOut(dispatch);
  };
  const signOut = async (dispatch) => {
    dispatch(signOutStart());
    try {
      const res = await axios.delete(
        `http://localhost:5000/signout/${user.uuid}`
      );
      dispatch(signOutSuccess(res.data));
    } catch (error) {
      console.log(error);
      dispatch(signOutFailure());
    }
  };

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
            <div className="w-10 rounded-full shadow-sm ">
              <img
                src={
                  user && user.img
                    ? user.img
                    : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                }
                className="avatar"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={`/users/${user.uuid}`}>
                <MdPerson className="lg:h-6 lg:w-6 h-4 w-4 text-indigo-700" />
                Profile
              </Link>
            </li>
            <li>
              <button onClick={handleClick}>
                <MdLogout className="lg:h-6 lg:w-6 h-4 w-4 text-indigo-700" />
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
