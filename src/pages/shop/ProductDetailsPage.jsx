import React, { useEffect, useState } from "react";
import ProductInfo from "./productdetails/ProductInfo";
import MinableCoins from "./productdetails/MinableCoins";
import ProductSpecifications from "./productdetails/ProductSpecifications";
import MiningProfitGraph from "./productdetails/MiningProfitGraph";
import PurchaseOptions from "./productdetails/PurchaseOptions";
// import BundleOfferPopup from "../../components/common/BundleOfferPopup";


const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Show once per session
    if (!sessionStorage.getItem("bundlePopupShown")) {
      setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("bundlePopupShown", "true");
      }, 600);
    }
  }, []);

  return (
    <div>
      {/* <BundleOfferPopup
        open={showPopup}
        onClose={() => setShowPopup(false)}
      /> */}

      <ProductInfo setProduct={setProduct} />
      <PurchaseOptions product={product} />
      <MinableCoins />
      {product && <MiningProfitGraph product={product} />}
      <ProductSpecifications />
    </div>
  );
};

export default ProductDetailsPage;
