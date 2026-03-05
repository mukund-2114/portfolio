import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const OIDCAnimation = () => {
    const [step, setStep] = useState(0);

    const steps = [
        "Idle",
        "1. 1st Party Login: YouTube requests Auth",
        "2. OP returns ID Token to YouTube",
        "3. 3rd Party: App initiates 'Sign in with Google'",
        "4. OP shows OAuth Consent (Profile, Email)",
        "5. OP returns ID Token to 3rd Party App"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev >= 5 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const isActive = (targetSteps) => targetSteps.includes(step);

    return (
        <div className="my-16 p-4 lg:p-10 bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center overflow-hidden">
            {/* Header / Status bar */}
            <div className="w-full flex justify-between items-center mb-12 px-4 border-b border-white/10 pb-4">
                <div className="flex gap-2 items-center text-sm font-mono text-gray-400">
                    <Icon icon="lucide:activity" className="text-emerald-400 animate-pulse" /> OIDC Ecosystem
                </div>
                <div className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                    {steps[step]}
                </div>
            </div>

            {/* Flow Canvas */}
            <div className="relative w-full max-w-3xl h-[450px] flex justify-center items-center mt-4">
                
                {/* 1st Party RP 1 (Top Left) */}
                <motion.div 
                    animate={{ scale: isActive([1, 2]) ? 1.05 : 1, borderColor: isActive([1, 2]) ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255, 255, 255, 0.1)' }}
                    className="absolute left-0 top-[40px] w-[140px] h-[100px] bg-[#111] rounded-2xl border-2 flex flex-col items-center justify-center z-10 shadow-2xl transition-colors duration-500"
                >
                    <Icon icon="logos:youtube-icon" className="text-3xl mb-2" />
                    <span className="text-xs font-bold text-gray-300 text-center leading-tight">YouTube<br/><span className="text-[10px] text-gray-500">(1st Party RP)</span></span>
                </motion.div>

                {/* 1st Party RP 2 (Bottom Left) */}
                <motion.div 
                    animate={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} // Static for context
                    className="absolute left-0 bottom-[40px] w-[140px] h-[100px] bg-[#111] rounded-2xl border-2 flex flex-col items-center justify-center z-10 shadow-2xl transition-colors duration-500 opacity-50"
                >
                    <Icon icon="logos:google-photos" className="text-3xl mb-2" />
                    <span className="text-xs font-bold text-gray-300 text-center leading-tight">Photos<br/><span className="text-[10px] text-gray-500">(1st Party RP)</span></span>
                </motion.div>

                {/* OpenID Provider (OP) Node (Center) */}
                <motion.div 
                    animate={{ scale: isActive([1, 2, 3, 4, 5]) ? 1.05 : 1, borderColor: isActive([1, 2, 3, 4, 5]) ? 'rgba(250, 204, 21, 0.8)' : 'rgba(255, 255, 255, 0.2)' }}
                    className="absolute left-[50%] -translate-x-[50%] top-[150px] w-[160px] h-[150px] bg-[#151515] rounded-3xl border-2 flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(250,204,21,0.1)] transition-colors duration-500"
                >
                    <div className="grid grid-cols-2 gap-1 mb-3 bg-orange-500/10 p-2 rounded-lg border border-orange-500/20">
                        <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                        <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                        <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                        <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                    </div>
                    <span className="text-sm font-bold text-white text-center leading-tight">auth-google</span>
                    <span className="text-[10px] font-mono text-orange-400 mt-1">OpenID Provider</span>
                </motion.div>

                {/* 3rd Party RP (Top Right) */}
                <motion.div 
                    animate={{ scale: isActive([3, 4, 5]) ? 1.05 : 1, borderColor: isActive([3, 4, 5]) ? 'rgba(56, 189, 248, 0.8)' : 'rgba(255, 255, 255, 0.1)' }}
                    className="absolute right-0 top-[40px] w-[140px] h-[100px] bg-[#111] rounded-2xl border-2 flex flex-col items-center justify-center z-10 shadow-2xl transition-colors duration-500"
                >
                    <Icon icon="lucide:layout-template" className="text-3xl mb-2 text-blue-400" />
                    <span className="text-xs font-bold text-gray-300 text-center leading-tight">3rd Party App<br/><span className="text-[10px] text-gray-500">(3rd Party RP)</span></span>
                </motion.div>

                 {/* OAuth Consent Form (Bottom Right) */}
                 <motion.div 
                    animate={{ opacity: isActive([4]) ? 1 : 0.3, scale: isActive([4]) ? 1.05 : 1, borderColor: isActive([4]) ? 'rgba(16, 185, 129, 0.8)' : 'rgba(255, 255, 255, 0.1)' }}
                    className="absolute right-0 bottom-[40px] w-[140px] h-[110px] bg-[#111] rounded-2xl border-2 flex flex-col items-start justify-center p-3 z-10 shadow-2xl transition-all duration-500"
                >
                    <span className="text-[10px] font-bold text-gray-300 mb-1 border-b border-white/10 w-full pb-1">OAuth 2.0 Form</span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1"><Icon icon="lucide:check-square"/> App Name</span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1"><Icon icon="lucide:check-square"/> Profile</span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1"><Icon icon="lucide:check-square"/> Email</span>
                </motion.div>


                {/* ANIMATED PACKETS */}
                <AnimatePresence mode="wait">
                    {/* Step 1: YouTube requests auth */}
                    {step === 1 && (
                        <motion.div
                            key="step-1"
                            initial={{ x: -280, y: -60, opacity: 0 }}
                            animate={{ x: -100, y: 0, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute flex items-center gap-2 bg-red-500/20 border border-red-500/50 text-red-300 px-3 py-1.5 rounded-full text-xs font-bold font-mono z-20"
                        >
                            <Icon icon="lucide:refresh-cw" /> Auto-login
                        </motion.div>
                    )}
                    
                    {/* Step 2: Auth-google returns JWT to YouTube */}
                    {step === 2 && (
                        <motion.div
                            key="step-2"
                            initial={{ x: -100, y: 0, opacity: 0 }}
                            animate={{ x: -280, y: -60, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-bold font-mono z-20"
                        >
                            <Icon icon="lucide:id-card" /> ID Token
                        </motion.div>
                    )}

                    {/* Step 3: 3rd Party App redirects user to auth-google */}
                    {step === 3 && (
                        <motion.div
                            key="step-3"
                            initial={{ x: 280, y: -60, opacity: 0 }}
                            animate={{ x: 100, y: 100, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute flex items-center gap-2 bg-blue-500/20 border border-blue-500/50 text-blue-300 px-3 py-1.5 rounded-full text-xs font-bold font-mono z-20"
                        >
                            <Icon icon="logos:google-icon" /> Sign In
                        </motion.div>
                    )}

                    {/* Step 4: Auth-google asks user for consent */}
                    {step === 4 && (
                        <motion.div
                            key="step-4"
                            initial={{ x: 100, y: 100, opacity: 0 }}
                            animate={{ x: 250, y: 210, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 px-3 py-1.5 rounded-full text-xs font-bold font-mono z-20"
                        >
                            <Icon icon="lucide:share" /> Consent?
                        </motion.div>
                    )}

                    {/* Step 5: Auth-google returns JWT to 3rd party app */}
                    {step === 5 && (
                        <motion.div
                            key="step-5"
                            initial={{ x: 100, y: 0, opacity: 0 }}
                            animate={{ x: 280, y: -60, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-bold font-mono z-20"
                        >
                            <Icon icon="lucide:id-card" /> ID Token
                        </motion.div>
                    )}

                </AnimatePresence>

                {/* Connecting lines for aesthetics */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0">
                    <line x1="140" y1="90" x2="320" y2="225" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="140" y1="360" x2="320" y2="225" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="600" y1="90" x2="420" y2="225" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="600" y1="360" x2="420" y2="225" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                </svg>

            </div>
            
            <div className="mt-8 text-center text-gray-500 text-xs font-mono w-full max-w-lg leading-relaxed">
                A single <strong>OpenID Provider (auth-google)</strong> handles authentication for both internal 1st-party apps (YouTube, Photos) and external 3rd-party apps (Teachyst). 
            </div>

            {/* Manual Controls */}
            <div className="flex gap-4 mt-6">
                <button onClick={() => setStep(0)} className="text-xs bg-white/5 hover:bg-white/10 text-white px-4 py-2 border border-white/10 rounded-lg transition-colors">Restart Flow</button>
            </div>
        </div>
    );
};

export default OIDCAnimation;
