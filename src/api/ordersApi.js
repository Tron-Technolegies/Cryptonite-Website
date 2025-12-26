import axiosClient from "./axiosClient";

const ordersApi = {
  // BUY
  getMyOrders: () => axiosClient.get("/orders/my-orders/"),

  // RENT
  getMyRentals: () => axiosClient.get("/my-rentals/"),

  // HOSTING
  getMyHostingRequests: () =>
    axiosClient.get("/my-hosting-requests/"),
};

export default ordersApi;
