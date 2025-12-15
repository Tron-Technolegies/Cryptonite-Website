import React from "react";

const LoaderButton = ({
  loading,
  text = "Submit",
  loadingText = "Please wait...",
  type = "submit",
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`
        w-full py-3 font-semibold rounded-full transition
        ${
          loading
            ? "bg-gray-500 cursor-not-allowed text-black"
            : "bg-(--primary-color) text-black hover:opacity-90"
        }
        ${className}
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          {loadingText}
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default LoaderButton;
