import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import CoinBadge from "../components/home/CoinBadge";
import { getCoinByAlgorithm, profitBarWidth } from "../utils/asicUi";
import { getImageUrl } from "../utils/imageUtils";
import { useNavigate } from "react-router-dom";

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

  const calculateProfit = (p) => {
    const coin = getCoinByAlgorithm(coins, p.algorithm);
    if (!coin) return 0;

    const revenue = Number(coin.btc_revenue || 0) * Number(p.hashrate) * 100000;
    const powerCost = (Number(p.power) / 1000) * 24 * Number(p.hosting_fee_per_kw);

    return revenue - powerCost;
  };

  const rows = products
    .map((p) => ({
      ...p,
      profit: calculateProfit(p),
      coin: getCoinByAlgorithm(coins, p.algorithm),
    }))
    .filter((p) => p.model_name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === "profit"
        ? b.profit - a.profit
        : sort === "power"
        ? a.power - b.power
        : b.hashrate - a.hashrate
    );

  return (
    <div className="bg-[#0d1210] min-h-screen p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">ASIC Miner Profitability</h1>

        {/* Controls */}
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

        {/* Table */}
        <div className="overflow-x-auto border border-gray-800 rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-[#161c1a] text-gray-400">
              <tr>
                <th className="p-4 text-left">MODEL</th>
                <th className="p-4 text-center">HASHRATE</th>
                <th className="p-4 text-center">POWER</th>
                <th className="p-4 text-center">COIN</th>
                <th className="p-4 text-right">PROFITABILITY</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="border-t border-gray-800 
                 hover:bg-[#161c1a] transition 
                 cursor-pointer"
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
                  <td className="p-4 text-center">{p.power} W</td>

                  <td className="p-4 text-center">
                    <CoinBadge coin={p.coin} />
                  </td>

                  <td className="p-4 text-right">
                    <p className="text-green-400 font-semibold">${p.profit.toFixed(2)}/day</p>
                    <div className="mt-1 h-1 bg-gray-800 rounded">
                      <div
                        className="h-1 bg-green-500 rounded"
                        style={{ width: `${profitBarWidth(p.profit)}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    No miners found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
