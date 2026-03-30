import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const KafkaAnimation = () => {
    const [step, setStep] = useState(0);

    const steps = [
        "Idle",
        "1. Producers: Sending streaming events to Kafka",
        "2. Partitioning: Messages distributed across lanes",
        "3. Scalability: Consumer Group 1 processes in parallel",
        "4. Decoupling: Consumer Group 2 reads independently",
        "5. Safety: Messages stored and ordered in log"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev >= 5 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const isActive = (targetSteps) => targetSteps.includes(step);

    return (
        <div className="my-16 p-4 lg:p-10 bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center overflow-hidden">
            {/* Header / Status bar */}
            <div className="w-full flex justify-between items-center mb-12 px-4 border-b border-white/10 pb-4">
                <div className="flex gap-2 items-center text-sm font-mono text-gray-400">
                    <Icon icon="lucide:layers" className="text-orange-400 animate-pulse" /> Kafka Event Stream
                </div>
                <div className="text-sm font-bold h-6 overflow-hidden relative min-w-[300px] text-right">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={step}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="absolute right-0 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400"
                        >
                            {steps[step]}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>

            {/* Flow Canvas */}
            <div className="relative w-full max-w-4xl h-[450px] flex justify-center items-center mt-4">
                
                {/* Producers (Left) */}
                <div className="absolute left-0 flex flex-col gap-12 z-10">
                    <motion.div 
                        animate={{ 
                            scale: isActive([1]) ? 1.1 : 1, 
                            borderColor: isActive([1]) ? 'rgba(251, 146, 60, 0.8)' : 'rgba(255, 255, 255, 0.1)',
                            backgroundColor: isActive([1]) ? 'rgba(251, 146, 60, 0.05)' : 'rgba(17, 17, 17, 1)'
                        }}
                        transition={{ duration: 0.8 }}
                        className="w-[120px] h-[80px] rounded-2xl border-2 flex flex-col items-center justify-center shadow-xl"
                    >
                        <Icon icon="lucide:smartphone" className="text-2xl mb-1 text-orange-400" />
                        <span className="text-[10px] font-bold text-gray-400">Mobile App</span>
                    </motion.div>
                    <motion.div 
                        animate={{ 
                            scale: isActive([1]) ? 1.1 : 1, 
                            borderColor: isActive([1]) ? 'rgba(251, 146, 60, 0.8)' : 'rgba(255, 255, 255, 0.1)',
                            backgroundColor: isActive([1]) ? 'rgba(251, 146, 60, 0.05)' : 'rgba(17, 17, 17, 1)'
                        }}
                        transition={{ duration: 0.8 }}
                        className="w-[120px] h-[80px] rounded-2xl border-2 flex flex-col items-center justify-center shadow-xl"
                    >
                        <Icon icon="lucide:server" className="text-2xl mb-1 text-orange-400" />
                        <span className="text-[10px] font-bold text-gray-400">Orders DB</span>
                    </motion.div>
                </div>

                {/* Kafka Cluster (Center) */}
                <motion.div 
                    animate={{ 
                        borderColor: isActive([1, 2, 5]) ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                        boxShadow: isActive([2]) ? '0 0 30px rgba(251, 146, 60, 0.1)' : 'none'
                    }}
                    className="absolute left-[50%] -translate-x-[50%] w-[240px] h-[320px] bg-[#151515] rounded-3xl border-2 flex flex-col p-4 shadow-2xl overflow-hidden"
                >
                    <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                        <Icon icon="logos:kafka-icon" className="text-xl" />
                        <span className="text-xs font-black text-white tracking-widest uppercase">Kafka Topic</span>
                    </div>
                    
                    {/* Partitions */}
                    <div className="flex flex-col gap-3 h-full">
                        {[0, 1, 2].map(i => (
                            <motion.div 
                                key={i} 
                                animate={{ 
                                    backgroundColor: isActive([2]) ? 'rgba(251, 146, 60, 0.05)' : 'rgba(10, 10, 10, 1)',
                                    borderColor: isActive([2]) ? 'rgba(251, 146, 60, 0.3)' : 'rgba(255, 255, 255, 0.05)'
                                }}
                                className="flex-1 rounded-xl border p-2 relative overflow-hidden group"
                            >
                                <div className="absolute top-1 left-2 text-[8px] font-mono text-gray-600 uppercase flex items-center gap-1">
                                    <Icon icon="lucide:hash" className="text-[10px]" /> Partition {i}
                                </div>
                                <div className="flex gap-1 items-center h-full pt-4">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, j) => (
                                            <motion.div 
                                                key={j} 
                                                animate={{ 
                                                    opacity: isActive([2, 3, 4, 5]) ? 1 : 0.2,
                                                    scale: isActive([2]) && j === 4 ? [1, 1.2, 1] : 1
                                                }}
                                                className="w-5 h-5 bg-orange-500/10 border border-orange-500/20 rounded-md flex items-center justify-center text-[8px] font-mono text-orange-500/40"
                                            >
                                                <Icon icon="lucide:file-text" className="text-[10px]" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Consumers (Right) */}
                <div className="absolute right-0 flex flex-col gap-8 z-10 w-[140px]">
                    <div className="text-[10px] font-mono text-gray-500 uppercase mb-[-20px] text-center">Consumer Group A</div>
                    <motion.div 
                        animate={{ 
                            scale: isActive([3]) ? 1.05 : 1, 
                            borderColor: isActive([3]) ? 'rgba(34, 197, 94, 0.8)' : 'rgba(255, 255, 255, 0.1)',
                            backgroundColor: isActive([3]) ? 'rgba(34, 197, 94, 0.05)' : 'rgba(17, 17, 17, 1)'
                        }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-[70px] rounded-xl border-2 flex items-center p-3 shadow-xl"
                    >
                        <Icon icon="lucide:bar-chart-3" className="text-xl mr-3 text-emerald-400" />
                        <span className="text-[9px] font-bold text-gray-400 leading-tight">Analytics Service</span>
                    </motion.div>
                    
                    <div className="text-[10px] font-mono text-gray-500 uppercase mb-[-20px] text-center">Consumer Group B</div>
                    <motion.div 
                        animate={{ 
                            scale: isActive([4]) ? 1.05 : 1, 
                            borderColor: isActive([4]) ? 'rgba(56, 189, 248, 0.8)' : 'rgba(255, 255, 255, 0.1)',
                            backgroundColor: isActive([4]) ? 'rgba(56, 189, 248, 0.05)' : 'rgba(17, 17, 17, 1)'
                        }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-[70px] rounded-xl border-2 flex items-center p-3 shadow-xl"
                    >
                        <Icon icon="lucide:bell" className="text-xl mr-3 text-blue-400" />
                        <span className="text-[9px] font-bold text-gray-400 leading-tight">Notification Service</span>
                    </motion.div>
                </div>

                {/* ANIMATED PACKETS */}
                <AnimatePresence>
                    {/* Step 1: Producer to Kafka */}
                    {step === 1 && (
                        <>
                            <motion.div
                                key="prod-1"
                                initial={{ left: '120px', top: '120px', opacity: 0, scale: 0.5 }}
                                animate={{ left: 'calc(50% - 120px)', top: '150px', opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                                className="absolute bg-orange-500 w-6 h-6 rounded-md shadow-[0_0_15px_orange] z-30 flex items-center justify-center"
                            >
                                <Icon icon="lucide:mail" className="text-white text-[10px]" />
                            </motion.div>
                            <motion.div
                                key="prod-2"
                                initial={{ left: '120px', top: '300px', opacity: 0, scale: 0.5 }}
                                animate={{ left: 'calc(50% - 120px)', top: '250px', opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                                className="absolute bg-orange-400 w-6 h-6 rounded-md shadow-[0_0_15px_orange] z-30 flex items-center justify-center"
                            >
                                <Icon icon="lucide:mail" className="text-white text-[10px]" />
                            </motion.div>
                        </>
                    )}

                    {/* Step 2: Ingestion highlight */}
                    {step === 2 && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="absolute z-30 text-orange-400 font-black text-xs bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/50"
                        >
                            INGESTING...
                        </motion.div>
                    )}

                    {/* Step 3: CG1 Reading (Parallel) */}
                    {step === 3 && (
                        <div className="absolute inset-0 z-30">
                            {[0, 1, 2].map(i => (
                                <motion.div
                                    key={`cg1-${i}`}
                                    initial={{ left: 'calc(50% + 100px)', top: `${155 + i * 80}px`, opacity: 0, scale: 0.5 }}
                                    animate={{ left: 'calc(100% - 140px)', top: '150px', opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 1.2, ease: "easeInOut", delay: i * 0.2 }}
                                    className="absolute bg-emerald-500 w-5 h-5 rounded-md shadow-[0_0_15px_emerald] z-30 flex items-center justify-center"
                                >
                                    <Icon icon="lucide:check-circle" className="text-white text-[10px]" />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Step 4: CG2 Reading (Independent) */}
                    {step === 4 && (
                        <div className="absolute inset-0 z-30">
                            <motion.div
                                key="cg2-1"
                                initial={{ left: 'calc(50% + 100px)', top: '225px', opacity: 0, scale: 0.5 }}
                                animate={{ left: 'calc(100% - 140px)', top: '320px', opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="absolute bg-blue-500 w-5 h-5 rounded-md shadow-[0_0_15px_blue] z-30 flex items-center justify-center"
                            >
                                <Icon icon="lucide:bell" className="text-white text-[10px]" />
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Aesthetic Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10 z-0">
                    <line x1="120" y1="120" x2="320" y2="150" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="120" y1="300" x2="320" y2="250" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="580" y1="150" x2="780" y2="150" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="580" y1="300" x2="780" y2="320" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
                </svg>

            </div>
            
            <div className="mt-8 text-center text-gray-500 text-xs font-mono w-full max-w-lg leading-relaxed h-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {step === 1 && "Waiters (Producers) are pinning new order tickets to the board."}
                        {step === 2 && "The board (Kafka) captures and organizes the tickets by category."}
                        {step === 3 && "The Pizza Chefs (Consumer Group A) are picking up tickets to start cooking."}
                        {step === 4 && "The Managers (Consumer Group B) read the same tickets independently to track sales."}
                        {step === 5 && "Every ticket is safely stored in a permanent log, even if the kitchen closes."}
                        {step === 0 && "Kafka acts as the central hub for all events in your system."}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Manual Controls */}
            <div className="flex gap-4 mt-6">
                <button onClick={() => setStep(0)} className="text-xs bg-white/5 hover:bg-white/10 text-white px-4 py-2 border border-white/10 rounded-lg transition-colors">Restart Flow</button>
            </div>
        </div>
    );
};

export default KafkaAnimation;
