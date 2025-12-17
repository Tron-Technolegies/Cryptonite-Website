import React, { useState } from "react";

import StepIndicator from "./components/StepIndicator";
import BuyOrRent from "./components/BuyOrRent";
import BuyOptions from "./components/BuyOptions";
import ShippingForm from "./components/ShippingForm";
import HostForm from "./components/HostForm";
import RentForm from "./components/RentForm";
import PaymentSection from "./components/PaymentSection";
import PaymentSuccess from "./components/PaymentSuccess";

const CheckoutFlow = () => {
  const [step, setStep] = useState(1);   // 1 → 4
  const [mode, setMode] = useState(null); // buy | rent
  const [buyType, setBuyType] = useState(null); // ship | host

  return (
    <div className="mt-12">

      {/* STEP INDICATOR */}
      <StepIndicator step={step} />

      {/* STEP 1: BUY OR RENT */}
      {step === 1 && (
        <BuyOrRent
          onBuy={() => {
            setMode("buy");
            setStep(2);
          }}
          onRent={() => {
            setMode("rent");
            setStep(3);
          }}
        />
      )}

      {/* STEP 2: SHIP OR HOST */}
      {step === 2 && mode === "buy" && (
        <BuyOptions
          onShip={() => {
            setBuyType("ship");
            setStep(3);
          }}
          onHost={() => {
            setBuyType("host");
            setStep(3);
          }}
        />
      )}

      {/* STEP 3: DETAILS */}
      {step === 3 && mode === "buy" && buyType === "ship" && (
        <ShippingForm onSuccess={() => setStep(4)} />
      )}

      {step === 3 && mode === "buy" && buyType === "host" && (
        <HostForm onSuccess={() => setStep(4)} />
      )}

      {step === 3 && mode === "rent" && (
        <RentForm onSuccess={() => setStep(4)} />
      )}

      {/* STEP 4: PAYMENT */}
      {step === 4 && <PaymentSection onSuccess={() => setStep(5)} />}

      {/* SUCCESS */}
      {step === 5 && <PaymentSuccess />}

    </div>
  );
};

export default CheckoutFlow;
