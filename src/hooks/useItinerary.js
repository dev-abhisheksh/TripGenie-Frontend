import { useQuery } from "@tanstack/react-query";
import { getItineraryById, getSharedItinerary } from "../api/itinerary.api";

export const useItinerary = (id) => {
  return useQuery({
    queryKey: ["itinerary", id],
    queryFn: () => getItineraryById(id).then(res => res.data),
    enabled: !!id,
    retry: false,
    staleTime: 5 * 60 * 1000
  })
}

export const useSharedItinerary = (shareId) => {
  return useQuery({
    queryKey: ["sharedItinerary", shareId],
    queryFn: () => getSharedItinerary(shareId).then(res => res.data),
    enabled: !!shareId,
    retry: false,
    staleTime: 10 * 60 * 1000
  })
}
