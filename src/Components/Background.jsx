import React from 'react';

const Background = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#020202]">
            {/* High-End Cinematic Background Logic */}

            {/* 1. Deep Space Base Glows */}
            <div className="absolute top-[-25%] left-[-15%] w-[80rem] h-[80rem] bg-indigo-900/20 rounded-full mix-blend-screen filter blur-[150px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[70rem] h-[70rem] bg-purple-900/15 rounded-full mix-blend-screen filter blur-[150px] animate-pulse animation-delay-2000"></div>

            {/* 2. Interactive "Energy" Blobs */}
            <div className="absolute top-[20%] left-[10%] w-[40rem] h-[40rem] bg-blue-600/5 rounded-full mix-blend-overlay filter blur-[100px] animate-blob"></div>
            <div className="absolute bottom-[10%] right-[20%] w-[45rem] h-[45rem] bg-cyan-600/5 rounded-full mix-blend-overlay filter blur-[100px] animate-blob animation-delay-4000"></div>

            {/* 3. Futuristic Perspective Grid - Makes it not 'just dark' */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.5) 1px, transparent 1px), 
                                      linear-gradient(90deg, rgba(56, 189, 248, 0.5) 1px, transparent 1px)`,
                    backgroundSize: '100px 100px',
                    transform: 'perspective(1000px) rotateX(60deg) translateY(-200px) translateZ(0)',
                    transformOrigin: 'top',
                }}
            ></div>

            {/* 4. Grainy Texture for Organic Feel */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay contrast-125"></div>

            {/* 5. Custom Depth Vignette */}
            <div className="absolute inset-0 bg-radial-vignette opacity-90"></div>

            {/* 6. Scanlines effect - Subtle tech vibe */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,.1)_50%),linear-gradient(90deg,rgba(255,0,0,.03),rgba(0,255,0,.01),rgba(0,0,255,.03))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20"></div>

            {/* 7. Bottom Cinematic Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-transparent"></div>
        </div>
    );
};

export default Background;
