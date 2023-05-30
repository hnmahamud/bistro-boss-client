import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isdmin", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/admin/${user?.email}`);
      console.log(response.data.isAdmin);
      return response.data.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};
export default useAdmin;
