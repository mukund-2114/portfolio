import React from 'react';
import { useInView } from 'react-intersection-observer';

const AnimatedSection = ({ children }) => {
  const [ref, inView] = useInView({
    threshold: 0.5, // Adjust this value as needed, 0.5 means 50% of the section is visible
    triggerOnce: true, // Ensures animation only happens once
  });

  return (
    <div ref={ref} className={`animated-section ${inView ? 'animate' : ''}`}>
      {children}
    </div>
  );
};

export default AnimatedSection;
