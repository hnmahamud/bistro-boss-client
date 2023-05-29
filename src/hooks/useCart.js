import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProviders";

const useCart = () => {
  const { user } = useContext(AuthContext);

  const token = localStorage.getItem("bistro-access-token");

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/carts?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return response.json();
    },
  });

  return [cart, refetch];
};
export default useCart;
