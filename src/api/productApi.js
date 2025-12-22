import axiosClient from "./axiosClient";

const productApi = {
  getAll: () => axiosClient.get("/products/"),
  getOne: (id) => axiosClient.get(`/products/${id}/`),
  
  // Bundle endpoints
  getBundles: () => axiosClient.get("/bundles/"),
  getBundle: (id) => axiosClient.get(`/bundles/${id}/`),
};

export default productApi;