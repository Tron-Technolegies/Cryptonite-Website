import React from 'react'
import AboutHeroSection from '../components/about/AboutHeroSection'
import WhyCryptonite from '../components/about/WhyCryptonite'
import EventsAndCelebrations from '../components/about/EventsAndCelebrations'
import Location from '../components/about/Location'
import ContactForm from '../components/about/ContactForm'

const AboutPage = () => {
  return (
    <div>
      <AboutHeroSection/>
      <WhyCryptonite/>
      <EventsAndCelebrations/>
      <Location/>
      <ContactForm/>
    </div>
  )
}

export default AboutPage
