import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import CoinBadge from "./CoinBadge";
import { getCoinByAlgorithm, profitBarWidth } from "../../utils/asicUi";
import { getImageUrl } from "../../utils/imageUtils";

export default function AsicTopMiners() {
  const [miners, setMiners] = useState([]);
  const navigate = useNavigate();
  const ELECTRICITY_COST = 0.058; // $ / kWh
  const REVENUE_PER_TH = 8.5; // $ / TH / day (example, realistic)

  useEffect(() => {
    Promise.all([axiosClient.get("/products/"), axiosClient.get("/asic-profitability/")]).then(
      ([pRes, cRes]) => {
        const coins = cRes.data?.data?.coins || {};

        const rows = (pRes.data || []).map((p) => {
          const hashrate = Number(p.hashrate);
          const power = Number(p.power);
          const electricity = Number(p.hosting_fee_per_kw || 0);

          if (!isFinite(hashrate) || !isFinite(power)) {
            return { ...p, profit: 0, electricityCost: 0 };
          }

          /* ===== ESTIMATED REVENUE ===== */
          const dailyRevenue = hashrate * 8.5; // $ / day (example)

          /* ===== ELECTRICITY COST ===== */
          const powerKW = power / 1000;
          const electricityCost = powerKW * 24 * ELECTRICITY_COST;

          const profit = dailyRevenue - electricityCost;

          return {
            ...p,
            profit,
            electricityCost,
          };
        });

        setMiners(rows.sort((a, b) => b.profit - a.profit).slice(0, 5));
      }
    );
  }, []);

  return (
    <div className="bg-[#0d1210] p-6 border border-gray-800  text-white">
      <h2 className="text-xl font-semibold mb-4">ASIC Miner Profitability</h2>

      {/* SAME TABLE DESIGN */}
      <div className="overflow-x-auto border border-gray-800 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-[#161c1a] text-gray-400">
            <tr>
              <th className="p-4 text-left">MODEL</th>
              <th className="p-4 text-center">HASHRATE</th>
              <th className="p-4 text-center">POWER</th>
              <th className="p-4 text-center">COIN</th>
              <th className="p-4 text-center">ELECTRICITY</th>

              <th className="p-4 text-right">PROFITABILITY</th>
            </tr>
          </thead>

          <tbody>
            {miners.map((m) => (
              <tr
                key={m.id}
                onClick={() => navigate(`/product/${m.id}`)}
                className="border-t border-gray-800 
                 hover:bg-[#161c1a] transition 
                 cursor-pointer"
              >
                {/* MODEL */}
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={getImageUrl(m.image)}
                    alt={m.model_name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">{m.model_name}</p>
                    <p className="text-xs text-gray-500">{m.brand}</p>
                  </div>
                </td>

                <td className="p-4 text-center">{m.hashrate}</td>
                <td className="p-4 text-center">{m.power} W</td>

                <td className="p-4 text-center">
                  <CoinBadge coin={m.coin} />
                </td>
                <td className="p-4 text-center text-gray-400">
                  ${m.electricityCost.toFixed(2)}/day
                </td>

                <td className="p-4 text-right">
                  <p className="font-semibold text-green-400">${m.profit.toFixed(2)}/day</p>
                  <div className="mt-1 h-1 bg-gray-800 rounded">
                    <div
                      className="h-1 bg-green-500 rounded"
                      style={{ width: `${profitBarWidth(m.profit)}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CENTERED BUTTON */}
      <button
        onClick={() => navigate("/asic-profitability")}
        className="mt-6 mx-auto block px-10 py-3 rounded-lg 
                   bg-green-500 text-black font-semibold 
                   hover:bg-green-400 transition"
      >
        View All ASIC Miners →
      </button>
    </div>
  );
}
