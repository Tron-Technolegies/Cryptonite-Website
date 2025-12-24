import React, { useEffect, useState } from "react";
import ProductInfo from "./productdetails/ProductInfo";
import MinableCoins from "./productdetails/MinableCoins";
import ProductSpecifications from "./productdetails/ProductSpecifications";
import MiningProfitGraph from "./productdetails/MiningProfitGraph";

const ProductDetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [product, setProduct] = useState(null);
  console.log("ProductDetailsPage product:", product);

  return (
    <div>
      <ProductInfo setProduct={setProduct} />
      <MinableCoins />

      {product && <MiningProfitGraph product={product} />}

      <ProductSpecifications />
    </div>
  );
};

export default ProductDetailsPage;
