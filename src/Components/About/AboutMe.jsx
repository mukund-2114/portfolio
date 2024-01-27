import React from 'react'

const AboutMe = ({about}) => {
  return (
    <div className='about'>
        {about==="skills" &&(
            <div className='mt-10'>
                <h3>Frontend Development</h3>
                <ul className='list-disc px-4'>
                    <li>React.js</li>
                    <li>JSX</li>
                    <li>Tailwind</li>
                </ul>
                <h3>Backend Development</h3>
                <ul className='list-disc px-4'>
                    <li>Node.js</li>
                    <li>Express.js</li>
                </ul>
            </div>
        )}
        {about==="experience" &&(
            <div className='mt-10'>
                <div className='flex justify-between'>
                    <h3>React Developer - BrainyBeams Infotech Pvt. Ltd.</h3>
                    <h3>Jan 2023-Oct 2023</h3>
                </div>
                <p className='text-base mt-4'>As a React Trainer, proficient in developing user-friendly web applications with optimal performance,I demonstrated strong analytical and problem-solving skills by gathering business requirements, creating detailed analysis documents, overcoming technical challenges for effective problem resolution and performance optimization.</p>
        </div>
        )}
        {about==="education" &&(
            <div className='mt-10'>
                <div className='flex justify-between'>
                    <h3>Software Engineering Technician - Centennial College</h3>
                    <h3>Present</h3>
                </div>
                <p className='text-base mt-4'>As a React Trainer, proficient in developing user-friendly web applications with optimal performance,I demonstrated strong analytical and problem-solving skills by gathering business requirements, creating detailed analysis documents, overcoming technical challenges for effective problem resolution and performance optimization.</p>
                <div className='flex justify-between mt-4'>
                    <h3>B.Tech Computer Enginnering - Marwadi University</h3>
                    <h3>Aug 2019 - May 2023</h3>
                </div>
                <p className='text-base mt-4'>As a React Trainer, proficient in developing user-friendly web applications with optimal performance,I demonstrated strong analytical and problem-solving skills by gathering business requirements, creating detailed analysis documents, overcoming technical challenges for effective problem resolution and performance optimization.</p>
        </div>
        )}
    </div>
  )
}

export default AboutMe