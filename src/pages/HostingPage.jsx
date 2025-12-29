import React from 'react'
import { useEffect } from 'react'
import HostingHeader from '../components/hosting/HostingHeader'
import PartnerCompanies from '../components/home/PartnerCompanies'
import ProductCards from '../components/home/ProductCards'
import HostingPurchaseSteps from '../components/hosting/HostingPurchaseSteps'
import WhyCryptonite from '../components/home/WhyCryptonite'
import DataCenters from '../components/hosting/DataCenters'
import StartHosting from '../components/hosting/StartHosting'
import MiningHosting from '../components/hosting/MiningHosting'
import WhyChooseHosting from '../components/hosting/WhyChooseHosting'
import MonitoringSupport from '../components/hosting/MonitoringSupport'

const HostingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <HostingHeader/>
      {/* <PartnerCompanies/> */}
      {/* <ProductCards/> */}
      <DataCenters/>
      <WhyChooseHosting/>
      {/* <WhyCryptonite/> */}
      <MiningHosting/>
      
       <DataCenters/>
       {/* <MonitoringSupport/> */}
       <StartHosting/>
      {/* <HostingPurchaseSteps/> */}
    </div>
  )
}

export default HostingPage
