import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProviders";
import { toast } from "react-toastify";
import { FaCartPlus } from "react-icons/fa";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  // const { pathname } = useLocation();

  const logoutHandler = () => {
    logout()
      .then(() => {
        toast("Logout successful!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navItems = (
    <>
      <NavLink>Home</NavLink>
      <NavLink>Contact Us</NavLink>
      <NavLink>Dashboard</NavLink>
      <NavLink to="/menu">Our Menu</NavLink>
      <NavLink to="/order/salads">Our Shop</NavLink>
      <Link className="relative flex">
        <FaCartPlus className="h-6 w-6"></FaCartPlus>
        <div className="absolute -top-3 left-4 badge badge-secondary">+99</div>
      </Link>
    </>
  );
  return (
    <div className="navbar fixed z-10 bg-opacity-75 bg-black text-white max-w-screen-xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown text-black">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 space-y-4 uppercase"
          >
            {navItems}
          </ul>
        </div>
        <p className="uppercase">
          <span className="text-xl md:text-2xl font-black">Bistro Boss</span>
          <br />
          <span className="text-sm font-bold">Restaurant</span>
        </p>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-10 uppercase">
          {navItems}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div
            className="dropdown dropdown-end tooltip tooltip-left uppercase text-left text-black"
            data-tip={user.displayName}
          >
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-16 rounded-full">
                <img src={user.photoURL} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 border rounded-md w-52 space-y-3"
            >
              <Link className="hover:text-blue-600">Profile</Link>
              <Link onClick={logoutHandler} className="hover:text-blue-600">
                Logout
              </Link>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
