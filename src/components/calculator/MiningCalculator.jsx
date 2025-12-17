import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CgSoftwareDownload } from "react-icons/cg";
import { FiClock } from "react-icons/fi";
import { CiCalculator1 } from "react-icons/ci";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";

export default function MiningCalculator() {
  // Inputs
  const [hashrate, setHashrate] = useState("");
  const [power, setPower] = useState("");
  const [electricityCost, setElectricityCost] = useState("");
  const [poolFee, setPoolFee] = useState("");

  const [btcPrice, setBtcPrice] = useState(0);
  const [hashValue, setHashValue] = useState(0.00000042);

  // Results
  const EMPTY_RESULT = {
    revenue: null,
    electricity: null,
    profit: null,
  };

  const [results, setResults] = useState({
    daily: EMPTY_RESULT,
    weekly: EMPTY_RESULT,
    monthly: EMPTY_RESULT,
    yearly: EMPTY_RESULT,
  });

  const [hasCalculated, setHasCalculated] = useState(false);

  // Fetch live BTC price
  useEffect(() => {
    fetchBTCPrice();
    const interval = setInterval(fetchBTCPrice, 86400000);
    return () => clearInterval(interval);
  }, []);

  const fetchBTCPrice = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur"
      );
      const data = await res.json();
      setBtcPrice(data.bitcoin.eur);
    } catch (err) {
      console.error("BTC fetch failed");
    }
  };

  // Core calculation
  const calculatePeriod = (days) => {
    const h = Number(hashrate) || 0;
    const p = Number(power) || 0;
    const e = Number(electricityCost) || 0;
    const fee = Number(poolFee) || 0;

    const dailyBTC = h * hashValue;
    const btcAfterFee = dailyBTC * (1 - fee / 100);
    const revenue = btcAfterFee * btcPrice * days;

    const electricity = (p / 1000) * 24 * e * days;

    return {
      revenue,
      electricity,
      profit: revenue - electricity,
      btc: btcAfterFee * days,
    };
  };

  // Calculate button handler
  const handleCalculate = () => {
    setResults({
      daily: calculatePeriod(1),
      weekly: calculatePeriod(7),
      monthly: calculatePeriod(30),
      yearly: calculatePeriod(365),
    });
    setHasCalculated(true);
  };

  // PDF download (FIXED)

  const safe = (value, decimals = 2) => (Number.isFinite(value) ? value.toFixed(decimals) : "0.00");
  const loadImage = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => resolve(img);
    });

  const downloadPDF = async () => {
    if (!hasCalculated) return;

    const doc = new jsPDF();

    /* ===== LOGO ===== */
    const logo = await loadImage("/logos/cryptonitelogoupdated.png");
    doc.addImage(logo, "PNG", 14, 10, 40, 15);

    /* ===== TITLE ===== */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("BITCOIN MINING PROFIT CALCULATION", 60, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text("Estimated mining returns based on the mining parameters you provided.", 60, 28);

    /* ===== INPUT DATA TABLE ===== */
    autoTable(doc, {
      startY: 40,
      head: [["Input Parameter", "Value"]],
      body: [
        ["Hashrate", `${hashrate} TH/s`],
        ["Power Consumption", `${power} W`],
        ["Electricity Cost", `${electricityCost} €/kWh`],
        ["Pool Fee", `${poolFee} %`],
        ["Bitcoin Price", `€${btcPrice}`],
        ["Hash Value", `${hashValue} BTC`],
      ],
      theme: "grid",
      headStyles: {
        fillColor: [22, 163, 74],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
    });

    /* ===== RESULTS TABLE ===== */
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Period", "Revenue (€)", "Electricity (€)", "Profit (€)", "BTC"]],
      body: [
        [
          "Daily",
          safe(results.daily.revenue),
          safe(results.daily.electricity),
          safe(results.daily.profit),
          safe(results.daily.btc, 6),
        ],
        [
          "Weekly",
          safe(results.weekly.revenue),
          safe(results.weekly.electricity),
          safe(results.weekly.profit),
          safe(results.weekly.btc, 6),
        ],
        [
          "Monthly",
          safe(results.monthly.revenue),
          safe(results.monthly.electricity),
          safe(results.monthly.profit),
          safe(results.monthly.btc, 6),
        ],
        [
          "Yearly",
          safe(results.yearly.revenue),
          safe(results.yearly.electricity),
          safe(results.yearly.profit),
          safe(results.yearly.btc, 6),
        ],
      ],
      theme: "grid",
      headStyles: {
        fillColor: [22, 163, 74],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 247, 246],
      },
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
    });

    /* ===== DISCLAIMER ===== */
    const finalY = doc.lastAutoTable.finalY + 12;
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text(
      "Disclaimer: This Bitcoin mining profit calculation is based on publicly available data and " +
        "serves only as a non-binding guide. Actual returns may differ from the displayed values. " +
        "No guarantee is given regarding accuracy, completeness, or reliability.",
      14,
      finalY,
      { maxWidth: 180 }
    );

    doc.save("cryptonite-mining-profit.pdf");
  };

  return (
    <div className="bg-[#f6faf7] rounded-xl p-6">
      <div className="flex text-center justify-center">
        <h2 className="text-xl flex items-center gap-2 font-bold mb-6">
          <CiCalculator1 className="text-green-800" />
          Enter Your Mining Details
        </h2>
      </div>
      <hr className="text-[#A6BFAF]" />

      {/* INPUTS */}
      <div className="grid grid-cols-1 mt-4 md:grid-cols-3 gap-6">
        <Input
          label="Hashrate"
          unit="TH/s"
          placeholder="e.g. 200"
          value={hashrate}
          setValue={setHashrate}
        />
        <Input
          label="Power Consumption"
          unit="W"
          placeholder="e.g. 3500"
          value={power}
          setValue={setPower}
        />
        <Input
          label="Electricity Cost"
          unit="€/kWh"
          placeholder={"0.058"}
          value={electricityCost}
          setValue={setElectricityCost}
        />

        <Input
          label="Pool Fee"
          unit="%"
          value={poolFee}
          placeholder="eg :2"
          setValue={setPoolFee}
        />
        <Input label="Bitcoin Price" unit="€" value={btcPrice} setValue={setBtcPrice} />
        <Input label="Hash Value" unit="BTC" value={hashValue} setValue={setHashValue} />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleCalculate}
          className="bg-green-600 text-white flex items-center gap-2 px-6 py-2 rounded-lg font-semibold"
        >
          <CiCalculator1 /> Calculate Profits
        </button>

        <button
          onClick={downloadPDF}
          disabled={!hasCalculated}
          className="flex items-center gap-2 px-5 py-2 bg-white border rounded-lg disabled:opacity-50"
        >
          PDF <CgSoftwareDownload />
        </button>
      </div>
      <div className="flex text-center justify-center mt-16">
        <h2 className="text-xl flex items-center gap-2 font-bold mb-6">
          <HiMiniArrowTrendingUp className="text-white bg-[#FFC400D9] p-1 rounded-full" size={24} />
          Estimated Returns
        </h2>
      </div>
      <hr className="text-[#A6BFAF]" />
      {/* RESULTS */}
      {results && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
          <ResultCard title="Daily" subtitle="24 hours" data={results.daily} />
          <ResultCard title="Weekly" subtitle="7 days" data={results.weekly} />
          <ResultCard title="Monthly" subtitle="30 days" data={results.monthly} />
          <ResultCard title="Yearly" subtitle="365 days" data={results.yearly} />
        </div>
      )}

      {/* DISCLAIMER */}
      <p className="text-sm text-gray-700 border bg-white border-gray-200 rounded-3xl p-4 mt-6">
        <strong>Disclaimer:</strong> Our Bitcoin mining profit calculation is based on publicly
        available data and serves only as a non-binding guide. Actual returns may differ from the
        displayed values. We assume no liability for accuracy of the information provided.
      </p>
    </div>
  );
}

function ResultCard({ title, subtitle, data }) {
  const format = (value) => (value === null ? "-" : `€${value.toFixed(2)}`);

  return (
    <div className="bg-white rounded-xl p-4 ">
      <div className="flex items-center gap-2 mb-3">
        <FiClock className="text-green-600" />
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>

      <div className="text-sm space-y-2">
        <div className="flex justify-between">
          <span>Revenue</span>
          <span>{format(data.revenue)}</span>
        </div>
        <div className="flex justify-between">
          <span>Electricity</span>
          <span>{format(data.electricity)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Profit</span>
          <span className="text-green-600">
            {data.profit === null ? "-" : `€${data.profit.toFixed(2)}`}
          </span>
        </div>
      </div>
    </div>
  );
}

function Input({ label, unit, placeholder, value, setValue }) {
  return (
    <div>
      <label className="text-sm font-medium text-[#7A7A7A]">{label}</label>
      <div className="flex items-center bg-white rounded-2xl px-3 py-2 mt-1">
        <input
          type="number"
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          className="w-full outline-none placeholder:text-gray-400"
        />
        <span className="text-xs text-[#7A7A7A] px-1 ml-2 rounded-full bg-[#E9E9E9]">{unit}</span>
      </div>
    </div>
  );
}
