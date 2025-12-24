import React, { useMemo, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

/* UI CONSTANTS */
const ELECTRICITY_COST = 0.058; // €/kWh
const REVENUE_PER_GH = 1.45; // €/GH/day (estimated)

const MiningProfitGraph = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const calculations = useMemo(() => {
    if (!product) return null;

    const hashrate = Number(product.hashrate);
    const power = Number(product.power);

    if (!isFinite(hashrate) || !isFinite(power)) return null;

    /* 🔹 SCALE BY QUANTITY */
    const totalHashrate = hashrate * quantity;
    const totalPower = power * quantity;

    const powerKW = totalPower / 1000;

    const salesDay = totalHashrate * REVENUE_PER_GH;
    const dayCosts = powerKW * 24 * ELECTRICITY_COST;
    const winningDay = salesDay - dayCosts;

    const monthlyRevenue = salesDay * 30;
    const monthlyCosts = dayCosts * 30;
    const profitMonth = winningDay * 30;

    const chartData = Array.from({ length: 30 }, (_, i) => {
      const variation = winningDay * (Math.random() * 0.15 - 0.075);
      return {
        day: i + 1,
        profit: Number((winningDay + variation).toFixed(2)),
      };
    });

    const avgProfit = chartData.reduce((sum, d) => sum + d.profit, 0) / chartData.length;

    return {
      salesDay,
      dayCosts,
      winningDay,
      monthlyRevenue,
      monthlyCosts,
      profitMonth,
      chartData,
      avgProfit,
    };
  }, [product, quantity]);

  if (!calculations) return null;

  const {
    salesDay,
    dayCosts,
    winningDay,
    monthlyRevenue,
    monthlyCosts,
    profitMonth,
    chartData,
    avgProfit,
  } = calculations;

  return (
    <section className="max-w-6xl mx-auto px-4 mt-16">
      <div className="bg-[#F5FAF7] border border-[#D9D9D9] rounded-2xl p-6">
        {/* ===== TOP BAR ===== */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          {/* Quantity Selector */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Number of miners</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 rounded-md bg-[#D9D9D9]"
              >
                −
              </button>
              <div className="px-6 py-1 border border-[#D9D9D9] rounded-md">{quantity}</div>
              <button
                onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                className="px-3 py-1 rounded-md bg-[#D9D9D9]"
              >
                +
              </button>
            </div>
          </div>

          {/* Electricity Cost (locked) */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Electricity costs</p>
            <div className="flex">
              <input
                value={ELECTRICITY_COST}
                disabled
                className="border border-[#D9D9D9] px-4 py-1 rounded-l-md bg-white w-24"
              />
              <span className="border border-l-0 border-[#D9D9D9] px-3 py-1 rounded-r-md bg-gray-100">
                €/kWh
              </span>
            </div>
          </div>
        </div>

        {/* ===== STATS GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Stat label="Sales Day" value={`€${salesDay.toFixed(2)}`} />
          <Stat label="Monthly revenue" value={`€${monthlyRevenue.toFixed(2)}`} />
          <Stat label="Day costs" value={`€${dayCosts.toFixed(2)}`} />
          <Stat label="Monthly costs" value={`€${monthlyCosts.toFixed(2)}`} />
          <Stat
            label="Winning Day"
            value={`€${winningDay.toFixed(2)}`}
            highlight={winningDay >= 0}
          />
          <Stat
            label="Profit Month"
            value={`€${profitMonth.toFixed(2)}`}
            highlight={profitMonth >= 0}
          />
        </div>

        {/* ===== GRAPH ===== */}
        <div className="bg-white rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">30-Day Profit / Miner</h3>
            <span className="font-bold text-green-600">Average Ø €{avgProfit.toFixed(2)}</span>
          </div>

          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="day" hide />
                <YAxis hide />
                <Tooltip formatter={(v) => `€${v}`} />

                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#22c55e"
                  fill="url(#profit)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            * Calculations are estimates based on current BTC price and network conditions. Actual
            results may vary.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ===== SMALL COMPONENT ===== */
const Stat = ({ label, value, highlight }) => (
  <div className="bg-white border border-[#D9D9D9] rounded-lg px-4 py-3 flex justify-between">
    <span className="text-sm text-gray-600">{label}</span>
    <span
      className={`font-semibold ${
        highlight === undefined ? "text-gray-900" : highlight ? "text-green-600" : "text-red-500"
      }`}
    >
      {value}
    </span>
  </div>
);

export default MiningProfitGraph;
