import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/user.api";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        retry: false,
        staleTime: 10 * 60 * 1000
    })
}