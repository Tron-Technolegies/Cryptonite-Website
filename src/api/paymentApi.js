import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE, 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("access");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

const paymentApi = {
  createPaymentIntent: (data) =>
    API.post("/payments/create-intent/", data),
};

export default paymentApi;
