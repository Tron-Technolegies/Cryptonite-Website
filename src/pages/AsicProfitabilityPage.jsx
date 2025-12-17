import React, { useEffect, useState } from "react";
import { fetchAsicMiners } from "../api/whattomine";

export default function AsicProfitabilityPage() {
  const [miners, setMiners] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAsicMiners().then(setMiners);
  }, []);

  const filtered = miners.filter((m) => m.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">ASIC Miner Profitability</h1>

      <input
        className="w-full mb-4 p-2 bg-gray-800 rounded"
        placeholder="Search miner..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full text-sm">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2 text-left">Model</th>
            <th>Hashrate</th>
            <th>Power</th>
            <th>Algo</th>
            <th>Profit/day</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((m, i) => (
            <tr key={i} className="border-b border-gray-700">
              <td className="p-2">{m.name}</td>
              <td>{m.hashrate}</td>
              <td>{m.power} W</td>
              <td>{m.algorithm}</td>
              <td className="text-green-400">${m.profitability?.toFixed(2) || "0.00"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
