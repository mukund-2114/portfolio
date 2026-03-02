import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import './App.css';
import Background from './Components/Background';
import FloatingIcons from './Components/FloatingIcons';
import About from './Components/About/About';
import Hero from './Components/HeroSection/HeroSection';
import Services from './Components/Services/Services';
import Project from './Components/Project';
import Contact from './Components/Contact';
import Navbar from './Components/HeroSection/Navbar';
import Footer from './Components/Footer';
import Social from './Components/Social';
import AnimatedSection from './Components/HeroSection/AnimationSection';
import Blog from './Components/Blog/Blog';

import BlogPost from './Components/Blog/BlogPost';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function MainLayout({ debugMode, setDebugMode, lenis }) {
  return (
    <div className={`relative ${debugMode ? 'debug-wireframes' : ''} pb-0 md:pb-0`}>
      {/* "Astonish" Factor: Wireframe Mode */}
      {debugMode && (
        <style>{`
          .debug-wireframes * {
            outline: 1px solid rgba(0, 255, 0, 0.3) !important;
            background: rgba(0, 20, 0, 0.1) !important;
            box-shadow: none !important;
          }
          .debug-wireframes text, .debug-wireframes p, .debug-wireframes h1, .debug-wireframes h2, .debug-wireframes h3 {
             color: #0f0 !important;
             font-family: 'Courier New', monospace !important;
          }
        `}</style>
      )}

      <Background debugMode={debugMode} />
      {!debugMode && <FloatingIcons />}
      <Navbar debugMode={debugMode} setDebugMode={setDebugMode} lenis={lenis} />
      <Social />
      
      <div id="home">
        <Hero />
      </div>

      <div id="about">
        <AnimatedSection>
          <About />
        </AnimatedSection>
      </div>

      <div id="services">
        <AnimatedSection>
          <Services />
        </AnimatedSection>
      </div>

      <div id="projects">
        <AnimatedSection>
          <Project />
        </AnimatedSection>
      </div>

      <div id="blog">
        <AnimatedSection>
          <Blog />
        </AnimatedSection>
      </div>

      <div id="contact">
        <AnimatedSection>
          <Contact />
        </AnimatedSection>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  const [debugMode, setDebugMode] = useState(false);
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    setLenis(lenisInstance);

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout debugMode={debugMode} setDebugMode={setDebugMode} lenis={lenis} />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
