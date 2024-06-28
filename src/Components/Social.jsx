import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const Social = () => {
  return (
    <div className='fixed hidden lg:block left-0 top-[40%] lg:p-3 ml-1 z-[999]'>
        <ul className='flex flex-col gap-5 '>
                        <li><a href="https://www.instagram.com/mukund.kapadia1987/" target='_blank'><Icon icon="skill-icons:instagram" width={30}/></a></li>
                        <li><a href="https://www.linkedin.com/in/mukund1987/" target='_blank'><Icon icon="devicon:linkedin" width={30}/></a></li>
                        <li><a href="https://github.com/mukund-2114" target='_blank'><Icon icon="devicon:github" width={30} className='bg-white rounded-sm'/></a></li>
        </ul>
    </div>
  )
}

export default Social