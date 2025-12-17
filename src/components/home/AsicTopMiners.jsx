import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAsicMiners } from "../../api/whattomine";

export default function AsicTopMiners() {
  const [miners, setMiners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAsicMiners()
      .then((data) => {
        console.log("MINERS:", data);

        const sorted = data
          .filter((m) => m.profitability !== null)
          .sort((a, b) => b.profitability - a.profitability)
          .slice(0, 10);

        setMiners(sorted);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-gray-400">Loading miners...</p>;
  }

  if (!miners.length) {
    return <p className="text-gray-400">No data available</p>;
  }

  return (
    <div className="bg-[#0f172a] rounded-xl p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">ASIC Miner Profitability</h2>
        <button onClick={() => navigate("/asic-profitability")} className="text-blue-400 text-sm">
          View All →
        </button>
      </div>

      {miners.map((m, i) => (
        <div key={i} className="grid grid-cols-5 gap-4 py-2 border-b border-gray-700 text-sm">
          <span className="col-span-2 text-white">{m.name}</span>
          <span>{m.hashrate}</span>
          <span>{m.power} W</span>
          <span className="text-green-400">${Number(m.profitability).toFixed(2)}/day</span>
        </div>
      ))}
    </div>
  );
}
