import React, { useEffect } from 'react'
import { Icon } from '@iconify/react';
import VanillaTilt from 'vanilla-tilt';
const Services = () => {

  useEffect(() => {
    const elements = document.querySelectorAll(".cards");
    VanillaTilt.init(elements);
  }, [])
  
  return (
    <section className='flex items-center justify-center relative services'>
    <div className='w-4/6 mx-auto flex flex-col items-center'>
      <img src="services4.gif" alt="" className=''/>
        <h1 className='font-extrabold text-5xl'>Services</h1>
        <p className='mt-2'>Expert Web Development Solutions for Your Digital Success</p>
        <div className='services text-center grid grid-cols-4 gap-8 px-2 py-5 mt-8'>
            <div className='px-8 py-10 border border-white cards rounded flex flex-col items-center justify-center gap-2'>
               <Icon icon="ph:code-fill" width={50}/>
              <h1 className='text-lg'>Web Design</h1>
              <p className='text-sm mt-4'>Designing visually striking and intuitive user interfaces for an engaging and memorable user experience.</p>
            </div>
            <div className='px-8 py-10  border border-white cards rounded flex flex-col items-center justify-center gap-2'>
            <Icon icon="mdi:responsive" width={50}/>
              <h1 className='text-lg'>Responsive Web Design</h1>
              <p className='text-sm mt-4'>Creating visually appealing and responsive designs that adapt seamlessly to various screen sizes and devices.</p>
            </div>
            <div className='px-8 py-10  border border-white cards rounded flex flex-col items-center justify-center gap-2'>
            <Icon icon="fluent:card-ui-24-regular" width={50}/>
              <h1 className='text-lg'>UI/UX Design</h1>
              <p className='text-sm mt-4'>Crafting visually appealing and intuitive user interfaces to enhance user experience.</p>
            </div>
            <div className='px-8 py-10  border border-white cards rounded flex flex-col items-center justify-center gap-2'>
            <Icon icon="octicon:rocket-16" width={50}/>
              <h1 className='text-lg'>SEO</h1>
              <p className='text-sm mt-4'>Implementing SEO best practices to improve website visibility and rankings on search engines.</p>
            </div>
        </div>
    </div>
    </section>
  )
}

export default Services