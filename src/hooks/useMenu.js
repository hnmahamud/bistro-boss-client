import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
  const {
    data: menu = [],
    isLoading: loader,
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const response = await fetch(
        "https://bistro-boss-server-swart.vercel.app/menu"
      );
      return response.json();
    },
  });

  return [menu, loader, refetch];
};

export default useMenu;
