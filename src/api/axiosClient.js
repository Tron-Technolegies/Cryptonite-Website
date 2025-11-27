import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

// Endpoints that DO NOT need token
const publicEndpoints = [
  "/auth/login/",
  "/auth/register/",
  "/products/",
  "/bundles/",
];

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  // Extract only path, not full URL
  const endpoint = config.url.startsWith("/")
    ? config.url
    : "/" + config.url;

  const isPublic = publicEndpoints.some((p) =>
    endpoint.startsWith(p)
  );

  if (!isPublic && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
