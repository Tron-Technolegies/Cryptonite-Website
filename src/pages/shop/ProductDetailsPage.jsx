import React from 'react'
import ProductInfo from './productdetails/ProductInfo'
import MinableCoins from './productdetails/MinableCoins'
import ProductSpecifications from './productdetails/ProductSpecifications'

const ProductDetailsPage = () => {
  return (
    <div>
      <ProductInfo/>
      <MinableCoins/>
      <ProductSpecifications/>
    </div>
  )
}

export default ProductDetailsPage
