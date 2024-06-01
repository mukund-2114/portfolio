
import AboutMe from './AboutMe'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useState } from 'react';


const About = () => {

    const [about, setAbout] = useState('skills');
    const aboutmelinks="bg-white text-black"
    
   
  return (
 
    <section className='flex items-center' id='about'>
    <div className='w-4/6 mx-auto flex justify-around gap-5 items-center'>
        <div className="photo2 -translate-y-10">
            <img src="mukund_photo2.png" alt="" className='scale-125' />
        </div>
        <div className="aboutme w-4/6 space-y-6">
            <h1 className='font-extrabold text-5xl'>About Me</h1>
            <p>Hello there! I'm Mukund Kapadia, a passionate React developer with a keen eye for crafting dynamic and user-friendly web applications. I specialize in creating responsive and performant web applications using the power of React.js. From crafting pixel-perfect user interfaces to implementing robust and scalable frontend architectures, I thrive on turning ideas into elegant, functional, and user-friendly experiences.</p>
            <ul className='flex gap-10'>
                <li className={`inline-block cursor-pointer px-4 py-2 ${about==="skills" && aboutmelinks}`}onClick={()=>setAbout('skills')}>Skills</li>
                <li className={`inline-block cursor-pointer px-4 py-2 ${about==="experience" && aboutmelinks}`}onClick={()=>setAbout('experience')}>Experience</li>
                <li className={`inline-block cursor-pointer px-4 py-2 ${about==="education" && aboutmelinks}`} onClick={()=>setAbout('education')}>Education</li>
                <li className={`inline-block cursor-pointer px-4 py-2 ${about==="certification" && aboutmelinks}`} onClick={()=>setAbout('certification')}>Certification</li>
            </ul>
            <div style={{ height: '300px', overflowY: 'auto' }}> {/* Adjust height as per your requirement */}
                <AboutMe about={about}/>
            </div>
        </div>
    </div>
    </section>
  )
}

export default About
