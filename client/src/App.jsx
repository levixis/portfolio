import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Certificates from './components/Certificates'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import './App.css'
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function App() {
  useEffect(() => {
    // Force ScrollTrigger to recalculate positions after initial render & image loads
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const timer3 = setTimeout(() => ScrollTrigger.refresh(), 1500);
    
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Certificates />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </>
  )
}

export default App
