import { useQuery } from "@tanstack/react-query";
import { VirtuDialAPI } from "./utils";

export const useAuthentication = () => {
  //
  const api = new VirtuDialAPI();

  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ["is-user-authenticated"],
    queryFn: () => api.isUserAuthenticated(),
  });

  return { isLoading, user: data?.data, error, isAuthenticated: isSuccess };
};
