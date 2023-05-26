import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProviders";
import LoadingSpinner from "../pages/Shared/LoadingSpinner/LoadingSpinner";

const Main = () => {
  const { fullLoading } = useContext(AuthContext);
  const location = useLocation();
  const noLogReg =
    location.pathname.includes("login") ||
    location.pathname.includes("register");

  if (fullLoading) {
    return <LoadingSpinner fullScreen={true}></LoadingSpinner>;
  }

  return (
    <div>
      {noLogReg || <NavBar></NavBar>}
      <Outlet></Outlet>
      {noLogReg || <Footer></Footer>}
    </div>
  );
};

export default Main;
