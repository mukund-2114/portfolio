
import AboutMe from './AboutMe'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useState } from 'react';


const About = () => {

    const [about, setAbout] = useState('skills');
    const aboutmelinks="bg-white text-black"
    
   
  return (
 
    <section className='lg:flex items-center lg:p-0 p-3 mb-10211222' id='about'>
    <div className='lg:w-4/6 mx-auto lg:flex justify-around gap-5 items-center'>
        <div className="photo2 lg:-translate-y-10 -translate-y-0">
            <img src="mukund_photo2.png" alt="" className='lg:scale-125 hidden lg:block' />
        </div>
        <div className="aboutme lg:w-4/6 space-y-3">
            <h1 className='lg:font-extrabold font-bold lg:text-5xl text-3xl text-center lg:text-left'>About Me</h1>
            <img src="mukund_photo2.png" alt="" width={250} height={200} className='mx-auto -translate-y-3 block lg:hidden' />
            <p className='lg:p-0 p-1'>Hello there! I'm Mukund Kapadia, a passionate React developer with a keen eye for crafting dynamic and user-friendly web applications. I specialize in creating responsive and performant web applications using the power of React.js. From crafting pixel-perfect user interfaces to implementing robust and scalable frontend architectures, I thrive on turning ideas into elegant, functional, and user-friendly experiences.</p>
            <ul className='lg:flex gap-10'>
                <li className={`inline-block cursor-pointer px-4 py-2 ${about==="skills" && aboutmelinks}`}onClick={()=>setAbout('skills')}>Skills</li>
                <li className={`inline-block cursor-pointer px-4 py-2 ${about==="experience" && aboutmelinks}`}onClick={()=>setAbout('experience')}>Experience</li>
                <li className={`inline-block cursor-pointer px-4 py-2 ${about==="education" && aboutmelinks}`} onClick={()=>setAbout('education')}>Education</li>
                <li className={`inline-block cursor-pointer px-4 py-2 ${about==="certification" && aboutmelinks}`} onClick={()=>setAbout('certification')}>Certification</li>
            </ul>
            <div style={{height:"300px",overflowY: 'auto' }}> {/* Adjust height as per your requirement */}
                <AboutMe about={about}/>
            </div>
        </div>
    </div>
    </section>
  )
}

export default About
