import React from 'react'
import { useEffect } from 'react'
import HeroSection from '../components/home/HeroSection'
import PartnerCompanies from '../components/home/PartnerCompanies'
import ProductCards from '../components/home/ProductCards'
import MiningLocations from '../components/home/MiningLocations'
import FAQ from '../components/home/FAQ'
import Achievements from '../components/home/Achievements'
import Gallery from '../components/home/Gallery'

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <HeroSection/>
      <PartnerCompanies/>
      <ProductCards/>
      <MiningLocations/>
      <Achievements/>
      <Gallery/>
      <FAQ/>
    </div>
  )
}

export default HomePage
