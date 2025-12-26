import axiosClient from "./axiosClient";

const ordersApi = {
  getMyOrders: () => axiosClient.get("/orders/my-orders/"),
};

export default ordersApi;
