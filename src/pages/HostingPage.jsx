import React from 'react'
import { useEffect } from 'react'
import HostingHeader from '../components/hosting/HostingHeader'
import PartnerCompanies from '../components/home/PartnerCompanies'
import ProductCards from '../components/home/ProductCards'
import HostingPurchaseSteps from '../components/hosting/HostingPurchaseSteps'

const HostingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <HostingHeader/>
      <PartnerCompanies/>
      <ProductCards/>
      <HostingPurchaseSteps/>
    </div>
  )
}

export default HostingPage
