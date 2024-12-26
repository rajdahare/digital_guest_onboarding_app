import axios from "axios";

const API = axios.create({
  baseURL:  import.meta.env.VITE_API_URL
});

export const login = (data) => API.post("/api/auth/login", data);
export const fetchHotels = () => API.get("/api/admin/hotels");
export const addHotel = (data) => API.post("/api/admin/hotels", data, {
  headers: { "Content-Type": "multipart/form-data" },
});
export const registerGuest = (data) => API.post("/api/guest/register", data);

export const getHotelDetails = (data) => API.get(`/api/admin/hotels/${data}`);

export const fetchBookingByHotelId = (data) => API.get(`/api/guest/hotel/${data}`);

export const getBooking = (data) => API.get(`/api/guest/${data}`);

export const updateHotel = (data) => API.put(`/api/admin/hotels/${data}`, data, {
  headers: { "Content-Type": "multipart/form-data" },
});

export const deleteHotel = (data) => API.delete(`/api/admin/hotels/${data}`);

