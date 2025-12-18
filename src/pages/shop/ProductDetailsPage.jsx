import React from 'react'
import { useEffect } from 'react'
import ProductInfo from './productdetails/ProductInfo'
import MinableCoins from './productdetails/MinableCoins'
import ProductSpecifications from './productdetails/ProductSpecifications'

const ProductDetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <ProductInfo/>
      <MinableCoins/>
      <ProductSpecifications/>
    </div>
  )
}

export default ProductDetailsPage
