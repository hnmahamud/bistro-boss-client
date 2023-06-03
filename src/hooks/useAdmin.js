import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      if (user?.email && loading === false) {
        const response = await axiosSecure.get(`/users/admin/${user?.email}`);
        return response.data.admin;
      } else {
        return "userNull";
      }
    },
  });
  return [isAdmin, isAdminLoading];
};
export default useAdmin;
