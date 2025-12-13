import React, { useEffect, useState } from "react";

const MinerProfitability = () => {
  const [miners, setMiners] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://whattomine.com/asic.json")
      .then((res) => res.json())
      .then((data) => {
        const list = Object.values(data.asics); // Extract miners
        setMiners(list);
      })
      .catch((err) => console.log("API error:", err));
  }, []);

  const filtered = miners.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">ASIC Miner Profitability</h2>

      <input
        type="text"
        placeholder="Search miners..."
        className="w-full p-3 rounded bg-[#1f2a38] mb-6 text-gray-300"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-3">
        {filtered.map((miner, index) => (
          <div
            key={index}
            className="flex justify-between p-4 bg-[#1a2433] text-white rounded-lg"
          >
            <div className="w-1/4">
              <p className="font-bold">{miner.name}</p>
              <p className="text-gray-400 text-sm">{miner.algorithms}</p>
            </div>

            <div className="w-1/6">{miner.hash_rate} H/s</div>
            <div className="w-1/6">{miner.power} W</div>

            <div className="w-1/6 text-green-400 font-bold">
              ${miner.profit.toFixed(2)}/day
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-gray-400">No miners found.</p>
        )}
      </div>
    </div>
  );
};

export default MinerProfitability;
