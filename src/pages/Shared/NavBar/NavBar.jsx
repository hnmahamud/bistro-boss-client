import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const navItems = (
    <>
      <NavLink>Home</NavLink>
      <NavLink>Contact Us</NavLink>
      <NavLink>Dashboard</NavLink>
      <NavLink>Our Menu</NavLink>
      <NavLink>Our Shop</NavLink>
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
        <Link className="btn btn-sm">Login</Link>
      </div>
    </div>
  );
};

export default NavBar;
