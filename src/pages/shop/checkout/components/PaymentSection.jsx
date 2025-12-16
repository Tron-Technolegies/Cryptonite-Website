import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentSection = () => {
  const stripe = useStripe();
  const elements = useElements();

  const confirmPayment = async () => {
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // REQUIRED for Stripe (especially 3DS / India)
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      // Show the REAL Stripe error
      alert(error.message);
    }
  };

  return (
    <div className="bg-[#0a1628] p-6 rounded-xl mt-8">
      <h2 className="text-2xl font-semibold mb-6">Payment</h2>

      <PaymentElement />

      <button
        onClick={confirmPayment}
        className="mt-6 w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-lg"
      >
        Pay & Place Order
      </button>
    </div>
  );
};

export default PaymentSection;
