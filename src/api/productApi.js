import axiosClient from "./axiosClient";

const productApi = {
  getAll: () => axiosClient.get("/products/"),
  getOne: (id) => axiosClient.get(`/products/${id}/`),
};

export default productApi;
