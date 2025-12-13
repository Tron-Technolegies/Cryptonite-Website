import React, { useEffect, useState } from "react";
import cartApi from "../../api/cartApi";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showBuyChoice, setShowBuyChoice] = useState(false);
  const [showHostingForm, setShowHostingForm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [hostingName, setHostingName] = useState("");
  const [hostingWhatsapp, setHostingWhatsapp] = useState("");

  const loadCart = async () => {
    try {
      const res = await cartApi.getCart();
      setCart(res.data);

      const totalRes = await cartApi.getTotal();
      setTotal(totalRes.data.total_price);
    } catch (err) {
      console.error("Error loading cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadCart();
  }, []);

  const handleQtyChange = async (id, qty) => {
    if (qty < 1) return;

    try {
      await cartApi.updateQty(id, { quantity: qty });
      loadCart();
    } catch (err) {
      console.error("Qty update error:", err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await cartApi.removeItem(id);
      loadCart();
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  const handleBuyNow = () => setShowBuyChoice(true);

  const goToNormalCheckout = () => {
    setShowBuyChoice(false);
    navigate("/checkout");
  };

  const goToHostingForm = () => {
    setShowBuyChoice(false);
    setShowHostingForm(true);
  };

  // ✅ UPDATED — Show success popup instead of navigating
  const handleHostingSubmit = () => {
    if (!hostingName.trim() || !hostingWhatsapp.trim()) {
      alert("Please fill name & WhatsApp number");
      return;
    }

    // Close form & show success popup
    setShowHostingForm(false);
    setShowSuccessPopup(true);
  };

  if (loading)
    return <div className="text-center py-20 text-gray-600 text-xl">Loading...</div>;

  if (cart.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        Your cart is empty
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 px-4 md:px-20 py-10 md:py-16">

      <h1 className="text-3xl md:text-4xl font-bold mb-10">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200 
                       flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
              <img
                src={item.product?.image}
                alt={item.product?.model_name}
                className="w-20 h-20 md:w-24 md:h-24 object-contain rounded-lg border p-2 bg-gray-50"
              />

              <div>
                <h2 className="text-lg md:text-xl font-semibold">
                  {item.product?.model_name}
                </h2>

                <p className="text-green-600 text-lg font-medium">
                  ${item.product?.price}
                </p>
              </div>
            </div>

            {/* QUANTITY CONTROLS */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <button
                onClick={() => handleQtyChange(item.id, item.quantity - 1)}
                className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 text-lg"
              >
                -
              </button>

              <span className="text-lg font-medium">{item.quantity}</span>

              <button
                onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 text-lg"
              >
                +
              </button>
            </div>

            <div className="flex justify-center md:justify-end w-full md:w-auto">
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 font-medium hover:text-red-800 text-sm md:text-base"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ORDER SUMMARY */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-md ml-auto">

        <h2 className="text-xl md:text-2xl font-bold mb-4">Order Summary</h2>

        <p className="text-lg">Total:</p>
        <p className="text-3xl font-extrabold text-green-600">${total}</p>

        <button
          onClick={handleBuyNow}
          className="w-full bg-black hover:bg-gray-900 py-3 rounded-lg text-lg text-white mt-6"
        >
          Buy Now
        </button>
      </div>

      {/* BUY CHOICE POPUP */}
      {showBuyChoice && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="bg-white p-8 rounded-xl w-full max-w-sm shadow-lg border">

            <h2 className="text-xl font-bold mb-6 text-center">
              Choose an Option
            </h2>

            <button
              onClick={goToNormalCheckout}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white mb-4"
            >
              Purchase & Receive Machine
            </button>

            <button
              onClick={goToHostingForm}
              className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg text-white"
            >
              Host in Our Data Center
            </button>

            <button
              onClick={() => setShowBuyChoice(false)}
              className="text-gray-600 mt-4 underline w-full text-center"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* HOSTING FORM POPUP */}
      {showHostingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="bg-white p-8 rounded-xl w-full max-w-sm shadow-lg border">
            <h2 className="text-xl font-bold mb-4 text-center">Hosting Details</h2>

            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-gray-100 p-3 rounded mb-4 border"
              value={hostingName}
              onChange={(e) => setHostingName(e.target.value)}
            />

            <input
              type="text"
              placeholder="WhatsApp Number"
              className="w-full bg-gray-100 p-3 rounded mb-4 border"
              value={hostingWhatsapp}
              onChange={(e) => setHostingWhatsapp(e.target.value)}
            />

            <button
              onClick={handleHostingSubmit}
              className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg text-white"
            >
              Submit
            </button>

            <button
              onClick={() => setShowHostingForm(false)}
              className="text-gray-600 mt-4 underline w-full text-center"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="bg-white p-8 rounded-xl w-full max-w-sm shadow-lg border text-center">
            <h2 className="text-xl font-bold mb-4 text-green-600">
              Thank you!
            </h2>
            <p className="text-gray-700 mb-6">
              We will contact you soon regarding hosting details.
            </p>

            <button
              onClick={() => setShowSuccessPopup(false)}
              className="w-full bg-black hover:bg-gray-900 py-3 rounded-lg text-white"
            >
              Okay
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default CartPage;
