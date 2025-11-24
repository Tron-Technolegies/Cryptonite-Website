import axiosClient from "./axiosClient";

const authApi = {
  signup: (data) => axiosClient.post("/auth/register/", data),

  login: (data) => axiosClient.post("/auth/login/", data),

  forgotPassword: (data) => axiosClient.post("/auth/forgot-password/", data),

  resetPassword: (uid, token, data) =>
    axiosClient.post(`/auth/reset-password/${uid}/${token}/`, data),
};

export default authApi;
