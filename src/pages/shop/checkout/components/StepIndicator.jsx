import React from "react";

const StepIndicator = ({ step, onStepChange }) => {
  return (
    <div className="flex justify-center gap-4 mb-10">
      {[1, 2, 3, 4].map((n) => (
        <button
          key={n}
          onClick={() => n < step && onStepChange(n)}
          className={`w-8 h-8 rounded-full font-semibold text-sm
            ${step >= n ? "bg-green-500 text-white" : "bg-green-100 text-green-700"}
            ${n < step ? "cursor-pointer" : "cursor-default"}`}
        >
          {n}
        </button>
      ))}
    </div>
  );
};

export default StepIndicator;
