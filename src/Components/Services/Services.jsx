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
    <section className='flex items-center justify-center relative services' id="services">
      <div className='w-4/6 mx-auto flex flex-col items-center'>
        <img src="services4.gif" alt="" className='' />
        <h1 className='font-extrabold text-5xl'>Services</h1>
        <p className='mt-2'>Expert Web Development Solutions for Your Digital Success</p>
        <div className='services text-center grid grid-cols-4 gap-8 px-2 py-5 mt-8'>
          {servicesData.services.map(service => (
            <div className='px-8 py-10 border border-white cards rounded flex flex-col items-center justify-center gap-2' key={service.title}>
              <Icon icon={service.icon} width={50} />
              <h1 className='text-lg'>{service.title}</h1>
              <p className='text-sm mt-4'>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
