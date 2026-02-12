import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }} // Trigger immediately when element enters viewport
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`animated-section ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
