import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    // enabled: !loading,
    queryFn: async () => {
      if (user?.email && loading === false) {
        const response = await axiosSecure.get(`/carts?email=${user?.email}`);
        return response.data;
      } else {
        return [];
      }
    },
  });

  return [cart, refetch];
};
export default useCart;
