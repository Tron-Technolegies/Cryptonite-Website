import React from 'react'
import { useEffect } from 'react'
import AboutHeroSection from '../components/about/AboutHeroSection'
import WhyCryptonite from '../components/about/WhyCryptonite'
import EventsAndCelebrations from '../components/about/EventsAndCelebrations'
import Location from '../components/about/Location'
import ContactForm from '../components/about/ContactForm'
import OurStory from '../components/about/OurStory'
import Achievements from '../components/home/Achievements'
import Leaders from '../components/about/Leaders'
import JoinCommunity from '../components/about/JoinCommunity'
import OurValues from '../components/about/OurValues'

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <AboutHeroSection/>
      <OurStory/>
      <Achievements/>
      <OurValues/>
      <Leaders/>
      {/* <WhyCryptonite/>
      <EventsAndCelebrations/>
      <Location/> */}
      {/* <ContactForm/> */}
      <JoinCommunity/>
    </div>
  )
}

export default AboutPage
