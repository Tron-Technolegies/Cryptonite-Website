import { Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-10 text-center">
        
        {/* CHECK ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <FiCheck className="text-green-600 text-3xl" />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Thank You!
        </h2>

        {/* MESSAGE (CONTENT NOT CHANGED) */}
        <p className="text-black text-sm mb-8 leading-relaxed">
          Congrats🎉Your order has been submitted successfully. 
        </p>

        {/* BUTTON */}
        <Link
          to="/"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Start New Order
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
