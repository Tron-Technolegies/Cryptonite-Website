import axiosClient from "./axiosClient";

const bundleProductApi = {
  getAll: () => axiosClient.get("/bundles/"),
  getOne: (id) => axiosClient.get(`/bundles/${id}/`),
};

export default bundleProductApi;
