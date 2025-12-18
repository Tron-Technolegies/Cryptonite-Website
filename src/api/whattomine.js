// src/api/whattomine.js
import axiosClient from "./axiosClient";

export const fetchAsicProfitability = async () => {
  const res = await axiosClient.get("asic-profitability/");

  const data = res?.data?.data || {};
  const minersObj = data.miners || {};

  console.log("MINERS OBJECT:", minersObj);

  return {
    meta: {
      live: res.data.live,
      cached: res.data.cached,
      source: res.data.source,
    },
    miners: Object.values(minersObj),
  };
};
