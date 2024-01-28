import React, { useState } from 'react'
import AboutMe from './AboutMe'

const About = () => {

    const [about, setAbout] = useState('skills');
    const aboutmelinks="bg-white text-black"

  return (
    // this is the about section of the website
    //Mukund Kapadia 301403876 24/01/2024 About.jsx
    <section className='flex items-center' id='about'>
    <div className='w-4/6 mx-auto flex justify-around gap-5'>
        <div className="photo2 mt-1">
            <img src="mukund_photo.png" alt="" />
        </div>
        <div className="aboutme w-4/6 space-y-6">
            <h1 className='font-extrabold text-5xl'>About Me</h1>
            <p>Hello there! I'm Mukund Kapadia, a passionate React developer with a keen eye for crafting dynamic and user-friendly web applications. I specialize in creating responsive and performant web applications using the power of React.js. From crafting pixel-perfect user interfaces to implementing robust and scalable frontend architectures, I thrive on turning ideas into elegant, functional, and user-friendly experiences.</p>
            <ul className='flex gap-10'>
                <li className={`inline-block cursor-pointer px-4 py-2 ${about==="skills" && aboutmelinks}`}onClick={()=>setAbout('skills')}>Skills</li>
                <li className={`inline-block cursor-pointer px-4 py-2 ${about==="experience" && aboutmelinks}`}onClick={()=>setAbout('experience')}>Experience</li>
                <li className={`inline-block cursor-pointer px-4 py-2 ${about==="education" && aboutmelinks}`} onClick={()=>setAbout('education')}>Education</li>
            </ul>
            <AboutMe about={about}/>
        </div>
    </div>
    </section>
  )
}

export default About