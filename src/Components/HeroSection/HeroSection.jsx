import React from 'react'
import { saveAs } from 'file-saver';
import resume from '../../Components/resume.pdf'

const HeroSection = () => {
    const handleDownload = () => {
        saveAs(resume, 'resume.pdf');
    };

    return (
        <div className='lg:w-4/6 mx-auto flex justify-around items-center min-h-screen z-10 p-3 lg:p-0'>
            <div className="content uppercase" >
                <div className="code-block w-full max-w-2xl transform hover:scale-[1.02] transition-transform duration-300 bg-black/40 border-white/5 backdrop-blur-md">
                    <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        <span className="ml-auto text-xs text-slate-600 font-mono">hero.tsx</span>
                    </div>
                    <div className="text-sm md:text-base">
                        <div><span className="line-number">1</span><span className="keyword">const</span> <span className="variable">Developer</span> = <span className="keyword">new</span> <span className="function">Person</span>();</div>
                        <div><span className="line-number">2</span><span className="variable">Developer</span>.<span className="function">name</span> = <span className="string">"Mukund Kapadia"</span>;</div>
                        <div><span className="line-number">3</span><span className="variable">Developer</span>.<span className="function">role</span> = [</div>
                        <div><span className="line-number">4</span>&nbsp;&nbsp;<span className="string">"Full Stack Developer"</span>,</div>
                        <div><span className="line-number">5</span>&nbsp;&nbsp;<span className="string">"System Architect"</span>,</div>
                        <div><span className="line-number">6</span>&nbsp;&nbsp;<span className="string">"Cloud Strategist"</span></div>
                        <div><span className="line-number">7</span>];</div>
                        <div><span className="line-number">8</span></div>
                        <div><span className="line-number">9</span><span className="comment">// Ready to build the future?</span></div>
                    </div>
                </div>

                <div className="button mt-8 flex gap-5">
                    <button className='px-8 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-primary/30 transition-all text-black bg-gradient-to-r from-primary to-secondary' onClick={() => window.location.href = 'mailto:mdrkkapadia@gmail.com?subject=Hiring Inquiry'}>
                        &lt;Hire Me /&gt;
                    </button>
                    <button className='px-8 py-3 rounded-lg font-bold border border-secondary/50 bg-transparent hover:bg-secondary/10 hover:shadow-lg hover:shadow-secondary/30 transition-all text-white' onClick={handleDownload}>
                        Download.cv
                    </button>
                </div>
            </div>
            
            <div className="photo lg:relative hidden max-w-[300px] lg:max-w-none lg:block">
                <div className="relative group">
                    {/* Background geometric elements */}
                    <div className="absolute -top-6 -right-6 w-72 h-72 border-2 border-white/10 rounded-xl transform rotate-12 transition-transform duration-500 group-hover:rotate-6"></div>
                    <div className="absolute -bottom-6 -left-6 w-72 h-72 border-2 border-white/10 rounded-xl transform -rotate-12 transition-transform duration-500 group-hover:rotate-6"></div>

                    {/* Main image container with Fireworks Tail Border */}
                    <div className="relative p-[4px] rounded-xl bg-gray-900 shadow-2xl overflow-hidden">
                        {/* The Spinning Fireworks Tail Gradient - Dark Theme & Slower */}
                        {/* Transparent -> Deep Indigo (Dark) -> Primary (Sky) -> White Head */}
                         <div className="absolute inset-[-150%] animate-[spin_7s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,#0000_0%,#0000_75%,#312e81_80%,#38bdf8_92%,#ffffff_100%)] opacity-100" />
                        
                        {/* Intense Glow Layer - Matching Theme */}
                        <div className="absolute inset-[-150%] animate-[spin_7s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,#0000_0%,#0000_75%,#312e81_80%,#38bdf8_92%,#ffffff_100%)] blur-xl opacity-70" />

                        {/* Image Wrapper */}
                        <div className="relative bg-black rounded-[9px] overflow-hidden">
                             {/* Gradient overlay for initial dark mood */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-20 pointer-events-none"></div>
                            
                            <img
                                src="Mukund_new.png"
                                className='relative z-10 w-full h-auto lg:w-[400px] transition-all duration-500 group-hover:scale-[1.02] filter brightness-90 grayscale-[20%] hover:grayscale-0'
                                alt="Profile"
                            />
                             {/* Optional dark vignette just inside border */}
                            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] z-20 rounded-[10px]"></div>
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

export default HeroSection;
