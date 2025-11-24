import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const openEndpoints = [
  "/products/",
  "/products",
  "/auth/login/",
  "/auth/register/",
  "/bundle-offers/",
];

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (openEndpoints.some((url) => config.url.includes(url))) {
    return config;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
