import React, { useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { Icon } from '@iconify/react';
import servicesData from '../../data.json'; // Import the JSON file

const Services = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".cards");
    VanillaTilt.init(elements);
  }, []);

  return (
    <section className='min-h-screen py-20 px-4 relative flex items-center justify-center' id="services">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-[120px] -z-10"></div>

      <div className='max-w-7xl mx-auto w-full'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block'>
            Services
          </h1>
          <p className='text-muted text-lg max-w-2xl mx-auto'>
            Expert Web Development Solutions for Your Digital Success
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {servicesData.services.map((service, index) => (
            <div
              className='cards p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-all duration-300 group flex flex-col items-center text-center'
              key={index}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Icon icon={service.icon} width={32} className="text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className='text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors'>{service.title}</h3>
              <p className='text-muted text-sm leading-relaxed'>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
