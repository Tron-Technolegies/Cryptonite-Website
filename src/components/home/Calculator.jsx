import React, { useState, useEffect } from "react";
import useGetBitCoinData from "../../hooks/coins/UseGetBitcoinData";
import useGetMiningStats from "../../hooks/coins/UseGetMiningStats"; // adjust path if needed
import { coinsPerDay } from "../../utils/BTCCalculator";

// If your logo sits in public/logos/cryptonitelogo.png, use absolute path:
const CRYPTONITE_PUBLIC_PATH = "/logos/cryptonitelogo.png";

export default function Calculator() {
  // btc price hook
  const { loading: priceLoading, btcData } = useGetBitCoinData();

  // difficulty hook (may fetch from mempool.space)
  const { difficulty, blockReward, loading: diffLoading, error: diffError } =
    useGetMiningStats() || {};

  // local UI state
  const [investment, setInvestment] = useState("");
  const [priceAfterOneYear, setPriceAfterOneYear] = useState("");

  const [btcBought, setBtcBought] = useState(0);
  const [btcOwned1, setBtcOwned1] = useState(0);
  const [hashBought, setHashBought] = useState(0);
  const [btcOwned2, setBtcOwned2] = useState(0);
  const [profit1, setProfit1] = useState(0);
  const [profit2, setProfit2] = useState(0);

  // fallback difficulty if the hook fails (only use as last resort)
  const FALLBACK_DIFFICULTY = 85_000_000_000_000; // obvious fallback (will differ from live)
  const fallbackUsed = difficulty == null;

  // user-visible debug info (remove in production)
  useEffect(() => {
    // helpful console logs for debugging
    console.log("BTC hook ->", { priceLoading, btcData });
    console.log("Difficulty hook ->", { difficulty, blockReward, diffLoading, diffError });
  }, [priceLoading, btcData, difficulty, blockReward, diffLoading, diffError]);

  const fmt = (n) => (Number.isFinite(n) ? n.toFixed(2) : "0.00");

  function handleCalculate() {
    const inv = Number(investment) || 0;
    const futurePrice = Number(priceAfterOneYear) || 0;

    // choose price field safely (some APIs use price, some use current_price)
    const btcPriceRaw = btcData && btcData[0]
      ? (btcData[0].price ?? btcData[0].current_price ?? btcData[0].currentPrice)
      : 0;
    const btcPrice = Number(btcPriceRaw) || 0;

    if (!btcPrice) {
      // show friendly message in console and return
      console.warn("No BTC price available yet. Check useGetBitCoinData hook or network.");
      // still allow calculation with zero price (results will be zero)
    }

    // use live difficulty if present, otherwise fallback (and warn)
    const usedDifficulty = difficulty ?? FALLBACK_DIFFICULTY;
    if (difficulty == null) {
      console.warn(
        "Difficulty not available from hook. Using fallback difficulty. Results may not match live network."
      );
    }

    const usedBlockReward = blockReward ?? 3.125;

    // TRADING
    const btc = btcPrice > 0 ? inv / btcPrice : 0;
    setBtcBought(btc);
    setBtcOwned1(btc * futurePrice);
    setProfit1(btc * futurePrice - inv);

    // MINING
    const hashrate = inv / 15; // 1TH/s cost assumption
    setHashBought(hashrate);

    // coinsPerDay should accept (hashrate, difficulty, block_reward)
    // ensure it returns number
    let perDay = 0;
    try {
      perDay = Number(coinsPerDay(hashrate, usedDifficulty, usedBlockReward)) || 0;
    } catch (err) {
      console.error("coinsPerDay threw:", err);
      perDay = 0;
    }

    const minedBTC = perDay * 365 * futurePrice;
    setBtcOwned2(minedBTC);
    setProfit2(minedBTC - 500 - inv);
  }

  // friendly UI messages
  const anyLoading = priceLoading || diffLoading;
  const btcPriceAvailable = !!(btcData && btcData[0] && (btcData[0].price ?? btcData[0].current_price));

  return (
    <section className="w-full min-h-screen bg-black px-5 md:px-10 lg:px-20 py-12 text-white">
      <h2 className="text-center text-3xl md:text-4xl font-semibold text-green-400 mb-6">
        Bitcoin Profit Calculator
      </h2>

      {/* Status line */}
      <div className="max-w-3xl mx-auto text-sm mb-4">
        {anyLoading && <div className="text-yellow-300">Loading live data...</div>}
        {!anyLoading && diffError && (
          <div className="text-red-400">Failed to fetch difficulty (see console). Using fallback.</div>
        )}
        {!anyLoading && fallbackUsed && !diffError && (
          <div className="text-yellow-300">
            Difficulty not yet loaded — using fallback until live value arrives.
          </div>
        )}
        {!anyLoading && btcPriceAvailable ? (
          <div className="text-green-300">Live BTC price detected.</div>
        ) : (
          <div className="text-slate-400">BTC price not available yet.</div>
        )}
      </div>

      {/* Input card */}
      <div className="max-w-3xl mx-auto p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-md flex flex-col md:flex-row gap-3 items-center">
        <input
          type="number"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
          placeholder="Enter your investment (USD)"
          className="w-full md:w-1/2 bg-[#0f1620] border border-green-500 text-white px-4 py-3 rounded-lg outline-none"
        />
        <input
          type="number"
          value={priceAfterOneYear}
          onChange={(e) => setPriceAfterOneYear(e.target.value)}
          placeholder="Expected BTC price after 1 year (USD)"
          className="w-full md:w-1/2 bg-[#0f1620] border border-green-500 text-white px-4 py-3 rounded-lg outline-none"
        />
        <button
          onClick={handleCalculate}
          className="w-full md:w-auto px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Calculate
        </button>
      </div>

      {/* Results */}
      <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
          <h3 className="text-green-300 mb-3 font-semibold">Trading</h3>
          <div className="text-sm space-y-2">
            <div className="flex justify-between"><span>BTC price</span><span>${btcData && btcData[0] ? fmt(btcData[0].price ?? btcData[0].current_price) : "0.00"}</span></div>
            <div className="flex justify-between"><span>BTC bought</span><span>{fmt(btcBought)}</span></div>
            <hr className="my-2 border-green-600/30"/>
            <div className="flex justify-between"><span>Value after 1yr</span><span>${fmt(btcOwned1)}</span></div>
            <div className="flex justify-between font-semibold text-green-300"><span>Profit</span><span>${fmt(profit1)}</span></div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          {/* prefer public path for image to avoid bundler issues */}
          <img src={CRYPTONITE_PUBLIC_PATH} alt="logo" className="w-40" />
        </div>

        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
          <h3 className="text-green-300 mb-3 font-semibold">Mining</h3>
          <div className="text-sm space-y-2">
            <div className="flex justify-between"><span>BTC price</span><span>${btcData && btcData[0] ? fmt(btcData[0].price ?? btcData[0].current_price) : "0.00"}</span></div>
            <div className="flex justify-between"><span>Hashrate bought</span><span>{fmt(hashBought)} TH/s</span></div>
            <div className="flex justify-between"><span>Hosting (1yr)</span><span>$500</span></div>
            <hr className="my-2 border-green-600/30"/>
            <div className="flex justify-between"><span>Value after 1yr</span><span>${fmt(btcOwned2)}</span></div>
            <div className="flex justify-between font-semibold text-green-300"><span>Profit</span><span>${fmt(profit2)}</span></div>
            <div className="mt-2 text-xs text-slate-400">
              Difficulty used: {difficulty ?? "fallback"} {fallbackUsed ? "(fallback)" : "(live)"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
