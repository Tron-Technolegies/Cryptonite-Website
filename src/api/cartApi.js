import axiosClient from "./axiosClient";

const cartApi = {
  addToCart: (body) => axiosClient.post("cart/add/", body),

  getCart: () => axiosClient.get("cart/"),

  updateQty: (id, body) => axiosClient.put(`cart/${id}/update/`, body),

  removeItem: (id) => axiosClient.delete(`cart/${id}/delete/`),

  getTotal: () => axiosClient.get("cart/total/"),
};

export default cartApi;
