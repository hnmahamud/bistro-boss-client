import { useContext } from "react";
import { AuthContext } from "../context/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../pages/Shared/LoadingSpinner/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Use Location for remember user target page
  const location = useLocation();

  // if user is not available then return
  if (loading) {
    return <LoadingSpinner fullScreen={false}></LoadingSpinner>;
  }

  // if user is logged in then go to private target page
  if (user) {
    return children;
  }

  toast.warning("You have to login first!", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  // if user is not logged in then don't go to private target page. Navigate login page
  return <Navigate to="/login" state={location?.pathname} replace></Navigate>;
};

export default PrivateRoute;
