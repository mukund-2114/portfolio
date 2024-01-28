import React from 'react'
import Typed from 'typed.js';
import { saveAs } from 'file-saver';
import resume from '../../Components/resume.pdf'

const HeroSection = () => {

const el = React.useRef(null);
  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['MERN Stack Developer',
      'JavaScript Ninja',
      'UI/UX Designer'],
      typeSpeed:70,
      backSpeed:20,
      loop: true
    });
    // using typed js library for typing animation in the hero section

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  const handleDownload = () => {
    // Use FileSaver.js to save the existing PDF file
    saveAs(resume, 'resume.pdf');
  };

  return (
    // this is the hero section of my website which using typed.js library 
    //Mukund Kapadia 3014043876 27/1/2024 HeroSection.jsx
    <div className=' w-4/6 mx-auto flex justify-around items-center h-[88vh] bg -z-10'>
        <div className="content uppercase" >
                <h3 className='relative text-white inline-block' style={{fontFamily:'Fira Code'}} >Hello -------------------------</h3>
                <h1 >I am Mukund Kapadia</h1>
                <span ref={el} className='font-bold' style={{fontSize:"2.5rem",fontFamily:'Cute Font'}}/>
                <div className="button mt-5 flex gap-5">
                    <button className='border rounded px-8 py-2 cursor-pointer'>Hire Me</button>
                    <button className='border rounded px-8 py-2 cursor-pointer'onClick={handleDownload}>Get CV</button>
                </div>
        </div>
        <div className="photo relative">
                <img src="mukund_photo.png" className='scale-150 hero-img ' alt="" />
        </div>
    </div>
  )
}

export default HeroSection