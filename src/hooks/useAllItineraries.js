import { useQuery } from "@tanstack/react-query";
import { getAllItineraries } from "../api/itinerary.api";

export const useAllItineraries = () => {
    return useQuery({
        queryKey: ["allItineraries"],
        queryFn: getAllItineraries,
        retry: false,
        staleTime: 10 * 60 * 1000
    })
}