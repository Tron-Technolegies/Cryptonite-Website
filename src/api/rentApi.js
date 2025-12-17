import axiosClient from "./axiosClient";

const rentApi = {
  rentMiner: (data) =>
    axiosClient.post("/rent/miner/", data),
};

export default rentApi;
