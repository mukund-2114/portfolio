import { useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import About from './Components/About/About';
import Hero from './Components/HeroSection/Hero';
import Services from './Components/Services/Services';
import Project from './Components/Project';
import Contact from './Components/Contact';
import Navbar from './Components/HeroSection/Navbar';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const ref = useRef();

  const pageTransition = {
    duration: 1, // Animation duration in seconds
    ease: 'easeInOut', // Easing function
  };

  return (
    <div>
      {/* using reacter router dom for routing
        additionally using javascript library 'framer-motion' for animation
        this is the main hero section of my website 
        Mukund Kapadia 3014043876 27/1/2024
      */}
      <Router>
        <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={pageTransition}
                >
                  <Hero />
                </motion.div>
              }
            />
            <Route
              path="/about"
              element={
                <motion.div
                  key="about"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={pageTransition}
                >
                  <About />
                </motion.div>
              }
            />
            <Route
              path="/services"
              element={
                <motion.div
                  key="services"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={pageTransition}
                >
                  <Services />
                </motion.div>
              }
            />
            <Route
              path="/projects"
              element={
                <motion.div
                  key="projects"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={pageTransition}
                >
                  <Project />
                </motion.div>
              }
            />
            <Route
              path="/contact"
              element={
                <motion.div
                  key="contact"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={pageTransition}
                >
                  <Contact />
                </motion.div>
              }
            />
          </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
