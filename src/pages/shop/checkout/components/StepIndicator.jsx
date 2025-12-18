import React from "react";

const StepIndicator = ({ step, onStepChange }) => {
  const handleClick = (n) => {
    if (n < step && typeof onStepChange === "function") {
      onStepChange(n);
    }
  };

  return (
    <div className="flex justify-center gap-4 mb-10">
      {[1, 2, 3, 4].map((n) => {
        const isCompleted = n < step;
        const isActive = n === step;

        return (
          <button
            key={n}
            onClick={() => handleClick(n)}
            disabled={!isCompleted}
            className={`
              w-8 h-8 rounded-full font-semibold text-sm transition
              ${
                isActive
                  ? "bg-green-600 text-white"
                  : isCompleted
                  ? "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                  : "bg-green-100 text-green-700 cursor-not-allowed"
              }
            `}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
};

export default StepIndicator;
