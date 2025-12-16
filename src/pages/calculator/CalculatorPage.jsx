import React from "react";
import MiningCalculator from "../../components/calculator/MiningCalculator";
import HowToUseCalculator from "../../components/calculator/HowToUseCalculator";
import PopularMinerExamples from "../../components/calculator/PopularMinerExamples";

export default function CalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto p-4 mt-8">
      {/* Title */}
      <div className="text-center p-6">
        <h1 className="font-bold josefin-sans text-5xl">CALCULATE MINING PROFITS</h1>
        <p className="text-gray-600 my-6 dm-sans text-sm font-medium md:text-base">
          Our Bitcoin mining calculator helps you get an overview of your potential profits. Below
          you will find a short guide on how to use it, as well as sample calculations for selected
          miners.
        </p>
      </div>

      <HowToUseCalculator />

      <MiningCalculator />
      <PopularMinerExamples />
    </div>
  );
}
