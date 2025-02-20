import React from 'react'
import Typed from 'typed.js';
import { saveAs } from 'file-saver';
import resume from '../../Components/resume.pdf'

const HeroSection = () => {

const el = React.useRef(null);
  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Full Stack Developer',
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
   
    <div className='lg:w-4/6 mx-auto flex justify-around items-center min-h-screen z-10 p-3 lg:p-0'>
        <div className="content uppercase" >
                <h3 className='relative text-white inline-block lg:w-full' style={{fontFamily:'Fira Code'}} >Hello ----------------------------------</h3>
                <h1 className='lg:text-[4rem] text-[2rem]'>I am Mukund Kapadia</h1>
                <span ref={el} className='font-bold' style={{fontSize:"2.5rem",fontFamily:'Cute Font'}}/>
                <div className="button mt-5 flex gap-5">
                    <button className='border rounded px-8 py-2 cursor-pointer'  onClick={() => window.location.href = 'mailto:mdrkkapadia@gmail.com?subject=Hiring Inquiry'}>Hire Me</button>
                    <button className='border rounded px-8 py-2 cursor-pointer'onClick={handleDownload}>Get CV</button>
                </div>
        </div>
        <div className="lg:relative photo hidden lg:block">
            <div className="relative group">
                {/* Background geometric elements */}
                <div className="absolute -top-6 -right-6 w-72 h-72 border-2 border-gray-300 rounded-xl transform rotate-12 transition-transform duration-500 group-hover:rotate-6"></div>
                <div className="absolute -bottom-6 -left-6 w-72 h-72 border-2 border-gray-300 rounded-xl transform -rotate-12 transition-transform duration-500 group-hover:rotate-6"></div>
                
                {/* Main image container */}
                <div className="relative">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/30 to-transparent rounded-xl z-10"></div>
                    
                    {/* Image wrapper */}
                    <div className="relative z-0 bg-gradient-to-br from-gray-800 to-gray-700 p-3 rounded-xl overflow-hidden backdrop-blur-sm">
                        <img 
                            src="Mukund_new.png" 
                            className='relative w-[400px] rounded-xl shadow-2xl transition-all duration-500 group-hover:scale-[1.02]' 
                            alt="Profile" 
                            style={{
                                boxShadow: '0 0 40px rgba(255, 255, 255, 0.2)'
                            }}
                        />
                    </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute -right-4 top-1/3 space-y-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroSection