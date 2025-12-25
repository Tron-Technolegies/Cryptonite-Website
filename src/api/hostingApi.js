import axiosClient from "./axiosClient";

const hostingApi = {
  createHostingRequest: (data) =>
    axiosClient.post("/hosting/create/", data),
};

export default hostingApi;
