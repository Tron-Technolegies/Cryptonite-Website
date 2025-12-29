import React, { useMemo, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const parseHashrate = (hashrate) => {
  const match = hashrate?.toLowerCase().match(/([\d.]+)\s*(kh|mh|gh|th|ph)?\/s/);
  if (!match) return 0;

  const value = parseFloat(match[1]);
  const unit = match[2];

  const multipliers = {
    kh: 1e3,
    mh: 1e6,
    gh: 1e9,
    th: 1e12,
    ph: 1e15,
  };

  return value * (multipliers[unit] || 1);
};

const MiningProfitGraph = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const calculations = useMemo(() => {
    if (!product || !product.coin) return null;

    const coin = product.coin;

    const btcRevenuePerHash = Number(coin.btc_revenue || 0); // BTC per hash/day
    const btcPrice = Number(coin.exchange_rate || 0);

    const hashrate = parseHashrate(product.hashrate);
    const totalHashrate = hashrate * quantity;

    // DAILY REVENUE
    const dailyBTC = btcRevenuePerHash * totalHashrate;
    const dailyRevenue = dailyBTC * btcPrice;

    // ELECTRICITY COST
    const powerKW = parseFloat(product.power) / 1000;
    const dailyElectricity = powerKW * (Number(product.hosting_fee_per_kw) / 30) * quantity;

    const dailyProfit = dailyRevenue - dailyElectricity;

    const monthlyRevenue = dailyRevenue * 30;
    const monthlyCost = dailyElectricity * 30;
    const monthlyProfit = dailyProfit * 30;

    const chartData = Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      profit: Number(dailyProfit.toFixed(2)),
    }));

    return {
      dailyRevenue,
      dailyCost: dailyElectricity,
      dailyProfit,
      monthlyRevenue,
      monthlyCost,
      monthlyProfit,
      chartData,
    };
  }, [product, quantity]);

  if (!calculations) return null;

  const {
    dailyRevenue,
    dailyCost,
    dailyProfit,
    monthlyRevenue,
    monthlyCost,
    monthlyProfit,
    chartData,
  } = calculations;

  return (
    <section className="max-w-6xl mx-auto px-4 mt-16">
      <div className="bg-[#F5FAF7] border border-[#D9D9D9] rounded-2xl p-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Number of miners</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 rounded-md bg-[#D9D9D9]"
              >
                −
              </button>
              <div className="px-6 py-1 border rounded-md">{quantity}</div>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 rounded-md bg-[#D9D9D9]"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Electricity cost</p>
            <div className="flex">
              <input
                disabled
                value={product.hosting_fee_per_kw}
                className="border px-4 py-1 rounded-l-md bg-white w-24"
              />
              <span className="border border-l-0 px-3 py-1 rounded-r-md bg-gray-100">
                $ / kW / month
              </span>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Stat label="Daily Revenue" value={`$${dailyRevenue.toFixed(2)}`} />
          <Stat label="Daily Cost" value={`$${dailyCost.toFixed(2)}`} />
          <Stat
            label="Daily Profit"
            value={`$${dailyProfit.toFixed(2)}`}
            highlight={dailyProfit >= 0}
          />
          <Stat
            label="Monthly Profit"
            value={`$${monthlyProfit.toFixed(2)}`}
            highlight={monthlyProfit >= 0}
          />
        </div>

        {/* GRAPH */}
        <div className="bg-white rounded-xl p-5">
          <h3 className="font-semibold mb-3">30-Day Profit Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <XAxis dataKey="day" hide />
              <YAxis hide />
              <Tooltip formatter={(v) => `$${v}`} />
              <Area
                type="monotone"
                dataKey="profit"
                stroke={dailyProfit >= 0 ? "#22c55e" : "#ef4444"}
                fill={dailyProfit >= 0 ? "#22c55e33" : "#ef444433"}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Profit estimates are based on real-time WhatToMine data. Actual results may vary due to
          network difficulty, pool fees, downtime, and electricity pricing.
        </p>
      </div>
    </section>
  );
};

const Stat = ({ label, value, highlight }) => (
  <div className="bg-white border border-[#D9D9D9] rounded-lg px-4 py-3 flex justify-between">
    <span className="text-sm text-gray-600">{label}</span>
    <span className={`font-semibold ${highlight ? "text-green-600" : "text-gray-800"}`}>
      {value}
    </span>
  </div>
);

export default MiningProfitGraph;
