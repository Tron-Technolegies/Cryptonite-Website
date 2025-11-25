import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

const openEndpoints = [
  "auth/login/",
  "auth/register/",
  "products/",
  "bundles/",
];

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (!openEndpoints.some((url) => config.url.includes(url))) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default axiosClient;
