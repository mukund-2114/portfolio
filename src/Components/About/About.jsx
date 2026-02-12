import AboutMe from './AboutMe'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useState } from 'react';


const About = () => {

    const [about, setAbout] = useState('skills');
    const aboutmelinks = "bg-white text-black"


    return (

        <section className='lg:flex items-center lg:h-screen h-full lg:p-0 p-3 mb-10 lg:mt-14 mt-0' id='about'>
            <div className='lg:w-4/6 mx-auto lg:flex justify-around gap-5 items-center'>
                <div className="photo2 lg:-translate-y-10 -translate-y-0">
                    <div className="relative group">
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-white/20 rounded-lg transform -rotate-6 transition-all duration-300 group-hover:rotate-0"></div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-white/20 rounded-lg transform rotate-6 transition-all duration-300 group-hover:rotate-0"></div>

                        {/* Main image container */}
                        <div className="relative z-10 bg-gradient-to-br from-black/5 to-black/20 p-2 rounded-lg backdrop-blur-sm">
                            <div className="relative overflow-hidden rounded-lg">
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50"></div>
                                <img src="Mukund_Black.png" alt="" className='w-80 hidden lg:block relative rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-105' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="aboutme lg:w-4/6 space-y-3">
                    <h1 className='lg:font-extrabold font-bold lg:text-5xl text-3xl text-center lg:text-left'>About Me</h1>
                    <div className="relative group w-fit mx-auto lg:hidden">
                        {/* Background geometric elements */}
                        <div className="absolute -top-4 -right-4 w-40 h-40 border-2 border-white/10 rounded-xl transform rotate-12 transition-transform duration-500 group-hover:rotate-6"></div>
                        <div className="absolute -bottom-4 -left-4 w-40 h-40 border-2 border-white/10 rounded-xl transform -rotate-12 transition-transform duration-500 group-hover:rotate-6"></div>

                        {/* Main image container */}
                        <div className="relative">
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent rounded-xl z-20 pointer-events-none"></div>

                            {/* Gradient Border Wrapper */}
                            <div className="p-1 rounded-xl bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 shadow-xl shadow-cyan-500/20">
                                {/* Image wrapper */}
                                <div className="relative z-0 bg-black rounded-lg overflow-hidden">
                                    <img
                                        src="Mukund_new.png"
                                        width={250}
                                        height={200}
                                        className='relative rounded-lg transition-all duration-500 group-hover:scale-[1.02]'
                                        alt="Profile"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Decorative dots */}
                        <div className="absolute -right-2 top-1/3 space-y-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                        </div>
                    </div>
                    <p className='lg:p-0 p-1'>Full-stack developer with 2+ years of hands-on experience building web applications using React.js, Next.js, TypeScript, and Node.js. Strong at turning product requirements into clean, responsive UIs and well-structured APIs, and comfortable owning features from implementation through testing, deployment to AWS, and ongoing iteration in Agile teams.</p>
                    <ul className='lg:flex gap-10'>
                        <li className={`inline-block cursor-pointer px-4 py-2 ${about === "skills" && aboutmelinks}`} onClick={() => setAbout('skills')}>Skills</li>
                        <li className={`inline-block cursor-pointer px-4 py-2 ${about === "experience" && aboutmelinks}`} onClick={() => setAbout('experience')}>Experience</li>
                        <li className={`inline-block cursor-pointer px-4 py-2 ${about === "education" && aboutmelinks}`} onClick={() => setAbout('education')}>Education</li>
                        <li className={`inline-block cursor-pointer px-4 py-2 ${about === "certification" && aboutmelinks}`} onClick={() => setAbout('certification')}>Certification</li>
                    </ul>
                    <div className='h-[350px]' style={{ overflowY: 'auto' }}> {/* Adjust height as per your requirement */}
                        <AboutMe about={about} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
