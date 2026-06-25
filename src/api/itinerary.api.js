import { API } from "./axiosInstance.api";

export const getItineraries = (limit) => API.get("/itinerary/itineraries", { params: { limit } });
export const getAllItineraries = () => API.get("/itinerary/itineraries");
export const uploadItinerary = (formData) => API.post("/itinerary/upload", formData, {
  headers: {
    "Content-Type": "multipart/form-data"
  }
});
export const getItineraryById = (id) => API.get(`/itinerary/${id}`);
export const getSharedItinerary = (shareId) => API.get(`/itinerary/share/${shareId}`);