import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import CoinBadge from "../components/home/CoinBadge";
import { getCoinByAlgorithm, profitBarWidth } from "../utils/asicUi";
import { getImageUrl } from "../utils/imageUtils";
import { useNavigate } from "react-router-dom";

// ---------- HELPERS ----------

// Parse "500W" → 500
const parsePower = (power) => {
  if (!power) return 0;
  return parseFloat(power.toLowerCase().replace("w", ""));
};

export default function AsicProfitabilityPage() {
  const [products, setProducts] = useState([]);
  const [coins, setCoins] = useState({});
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("profit");
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([axiosClient.get("/products/"), axiosClient.get("/asic-profitability/")]).then(
      ([pRes, cRes]) => {
        setProducts(pRes.data || []);
        setCoins(cRes.data?.data?.coins || {});
      }
    );
  }, []);

  // ----------------- CORE CALCULATION -----------------
  const calculateElectricityCost = (p) => {
    const powerKW = parsePower(p.power) / 1000;
    const rate = parseFloat(p.hosting_fee_per_kw);
    return powerKW * (rate / 30);
  };

  const calculateProfit = (p) => {
    const coin = getCoinByAlgorithm(coins, p.algorithm);
    if (!coin) return 0;

    const btcRevenue = Number(coin.btc_revenue || 0);
    const btcPrice = Number(coin.exchange_rate || 0);

    const revenueUSD = btcRevenue * btcPrice;
    const electricityCost = calculateElectricityCost(p);

    return revenueUSD - electricityCost;
  };

  const rows = products
    .map((p) => ({
      ...p,
      profit: calculateProfit(p),
      electricity: calculateElectricityCost(p),
      coin: getCoinByAlgorithm(coins, p.algorithm),
    }))
    .filter((p) => p.model_name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === "profit"
        ? b.profit - a.profit
        : sort === "power"
        ? parsePower(a.power) - parsePower(b.power)
        : a.hashrate.localeCompare(b.hashrate)
    );

  return (
    <div className="bg-[#0d1210] min-h-screen p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">ASIC Miner Profitability</h1>

        <div className="flex flex-wrap gap-3 mb-6">
          <input
            className="px-4 py-2 rounded-lg bg-[#161c1a] border border-gray-700"
            placeholder="Search miner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="px-3 py-2 rounded-lg bg-[#161c1a] border border-gray-700"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="profit">Sort by Profit</option>
            <option value="power">Sort by Power</option>
            <option value="hashrate">Sort by Hashrate</option>
          </select>
        </div>

        <div className="overflow-x-auto border border-gray-800 rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-[#161c1a] text-gray-400">
              <tr>
                <th className="p-4 text-left">MODEL</th>
                <th className="p-4 text-center">HASHRATE</th>
                <th className="p-4 text-center">POWER</th>
                <th className="p-4 text-center">ELECTRICITY</th>
                <th className="p-4 text-center">COIN</th>
                <th className="p-4 text-right">PROFIT / DAY</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="border-t border-gray-800 hover:bg-[#161c1a] cursor-pointer"
                >
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={getImageUrl(p.image)}
                      className="w-10 h-10 rounded object-cover"
                      alt={p.model_name}
                    />
                    <div>
                      <p className="font-medium">{p.model_name}</p>
                      <p className="text-xs text-gray-500">{p.brand}</p>
                    </div>
                  </td>

                  <td className="p-4 text-center">{p.hashrate}</td>
                  <td className="p-4 text-center">{p.power}</td>
                  <td className="p-4 text-center text-orange-400">
                    ${p.electricity.toFixed(2)}/day
                  </td>

                  <td className="p-4 text-center">
                    <CoinBadge coin={p.coin} />
                  </td>

                  <td className="p-4 text-right">
                    <p
                      className={`font-semibold ${
                        p.profit >= 0 ? "text-green-400" : "text-red-500"
                      }`}
                    >
                      {p.profit >= 0 ? "+" : "-"}${Math.abs(p.profit).toFixed(2)}/day
                    </p>
                    <div className="mt-1 h-1 bg-gray-800 rounded">
                      <div
                        className={`h-1 rounded ${p.profit >= 0 ? "bg-green-500" : "bg-red-500"}`}
                        style={{ width: `${profitBarWidth(p.profit)}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DISCLAIMER */}
        <div className="mt-6 text-sm text-gray-400 bg-[#141a18] border border-gray-700 rounded-lg p-4">
          <p className="font-medium text-gray-300 mb-1">Profitability Information</p>
          <p>
            Profit estimates are based on real-time network data from WhatToMine and assume current
            difficulty and market conditions.
          </p>
          <p className="mt-1">
            Electricity cost is calculated using your selected rate. Actual results may vary due to
            pool fees, downtime, and market volatility.
          </p>
          <p className="mt-1">
            Negative values indicate that mining is currently not profitable at the selected
            electricity rate.
          </p>
        </div>
      </div>
    </div>
  );
}
