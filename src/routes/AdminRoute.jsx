import { Navigate } from "react-router-dom";
import LoadingSpinner from "../pages/Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  console.log(isAdminLoading);

  // if user is not available then return
  if (loading || isAdminLoading) {
    return <LoadingSpinner fullScreen={true}></LoadingSpinner>;
  }

  // if user is logged in then go to private target page
  if (user && isAdmin) {
    return children;
  }

  // if user is not logged in then don't go to private target page. Navigate login page
  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;
