import React, { useEffect, useState } from "react";
import ProductInfo from "./productdetails/ProductInfo";
import MinableCoins from "./productdetails/MinableCoins";
import ProductSpecifications from "./productdetails/ProductSpecifications";
import MiningProfitGraph from "./productdetails/MiningProfitGraph";
import PurchaseOptions from "./productdetails/PurchaseOptions";
import axiosClient from "../../api/axiosClient";
import { getCoinByAlgorithm } from "../../utils/asicUi";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [coin, setCoin] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!sessionStorage.getItem("bundlePopupShown")) {
      setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("bundlePopupShown", "true");
      }, 600);
    }
  }, []);

  // 🔥 Load coin data when product is available
  useEffect(() => {
    if (!product) return;

    axiosClient.get("/asic-profitability").then((res) => {
      const coins = res.data?.data?.coins || {};
      const matchedCoin = getCoinByAlgorithm(coins, product.algorithm);
      setCoin(matchedCoin || null);
    });
  }, [product]);

  return (
    <div>
      {/* <BundleOfferPopup open={showPopup} onClose={() => setShowPopup(false)} /> */}

      <ProductInfo setProduct={setProduct} />

      <PurchaseOptions product={product} />

      <MinableCoins />

      {/* Pass coin explicitly */}
      {product && coin && <MiningProfitGraph product={{ ...product, coin }} />}

      <ProductSpecifications />
    </div>
  );
};

export default ProductDetailsPage;
