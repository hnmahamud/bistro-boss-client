import { Link, NavLink } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
  const { user, logout } = useAuth();
  const [cart] = useCart();

  // const { pathname } = useLocation();

  const logoutHandler = () => {
    logout()
      .then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Logout successful!",
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
      <Link to="/dashboard/my-cart" className="relative flex">
        <FaCartPlus className="h-6 w-6"></FaCartPlus>
        <div className="absolute -top-3 left-4 badge badge-secondary">
          +{cart ? cart.length : 0}
        </div>
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
