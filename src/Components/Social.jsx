import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const Social = () => {
  return (
    <div className='fixed hidden lg:block left-6 top-1/2 -translate-y-1/2 z-[999]'>
      <ul className='flex flex-col gap-6'>
        <li><a href="https://www.instagram.com/mukund.kapadia1987/" target='_blank' className='group'><Icon icon="skill-icons:instagram" width={24} className='opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300' /></a></li>
        <li><a href="https://www.linkedin.com/in/mukund1987/" target='_blank' className='group'><Icon icon="devicon:linkedin" width={24} className='opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300' /></a></li>
        <li><a href="https://github.com/mukund-2114" target='_blank' className='group'><Icon icon="mdi:github" width={26} className='text-white opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300' /></a></li>
      </ul>
    </div>
  )
}

export default Social