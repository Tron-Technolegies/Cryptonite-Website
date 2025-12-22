import React, { useEffect } from "react";
import BundleInfo from "./bundleDetails/BundleInfo";
import BundleIncludedProducts from "./bundleDetails/BundleIncludedProducts";
import BundleSpecifications from "./bundleDetails/BundleSpecifications";

export default function BundleProductDetailsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div>
        <BundleInfo />
        <BundleIncludedProducts />
        <BundleSpecifications />
      </div>
    </div>
  );
}
