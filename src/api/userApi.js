import axiosClient from "./axiosClient";

const userApi = {
  getMe: () => axiosClient.get("/auth/me/"),
  updateMe: (data) => axiosClient.put("/auth/me/", data),
  changePassword: (data) => axiosClient.post("/auth/change-password/", data),
};

export default userApi;
