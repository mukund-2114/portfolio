import Navbar from './Navbar'
import HeroSection from './HeroSection'
import About from '../About/About'
import Services from '../Services/Services'
import Project from '../Project'
import Contact from '../Contact'
import AnimatedSection from './AnimationSection'

const Hero = () => {
  return (
    <div>

      <HeroSection/>
      <AnimatedSection>
        <About/>
      </AnimatedSection>
      {/* <AnimatedSection> */}
        <Project/>
      {/* </AnimatedSection> */}
      <AnimatedSection>
        <Services/>
      </AnimatedSection>
      <AnimatedSection>
        <Contact/>
      </AnimatedSection>
    </div>
  );
};

export default Hero;
