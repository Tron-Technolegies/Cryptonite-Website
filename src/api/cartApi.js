import axiosClient from "./axiosClient";

const cartApi = {
  addToCart: (body) => axiosClient.post("/cart/add/", body),
  getCart: () => axiosClient.get("/cart/"),
  remove: (id) => axiosClient.delete(`/cart/remove/${id}/`),
  update: (id, body) => axiosClient.put(`/cart/update/${id}/`, body),
};

export default cartApi;
