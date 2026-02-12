import React, { useEffect, useState, useMemo, memo, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import confetti from 'canvas-confetti';

const icons = [
    { icon: "logos:react", name: "React" },
    { icon: "logos:nextjs-icon", name: "Next.js" },
    { icon: "logos:nodejs-icon", name: "Node.js" },
    { icon: "logos:python", name: "Python" },
    { icon: "logos:aws", name: "AWS" },
    { icon: "logos:docker-icon", name: "Docker" },
    { icon: "devicon:typescript", name: "TypeScript" },
    { icon: "logos:postgresql", name: "PostgreSQL" },
    { icon: "logos:mongodb-icon", name: "MongoDB" },
    { icon: "logos:tailwindcss-icon", name: "Tailwind" },
    { icon: "logos:javascript", name: "JavaScript" },
    { icon: "logos:visual-studio-code", name: "VS Code" },
    { icon: "logos:java", name: "Java" },
    { icon: "logos:firebase", name: "Firebase" },
    { icon: "logos:redux", name: "Redux" }
];

// Grid-based distribution to prevent overlapping
const generateRandomPositions = (count) => {
    const cols = 4;
    const rows = 4;
    const totalSlots = cols * rows;
    const slots = Array.from({ length: totalSlots }, (_, i) => i);

    // Shuffle slots
    for (let i = slots.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [slots[i], slots[j]] = [slots[j], slots[i]];
    }

    return Array.from({ length: count }).map((_, i) => {
        const slotIndex = slots[i % totalSlots];
        const col = slotIndex % cols;
        const row = Math.floor(slotIndex / cols);

        // Base position in grid + random offset
        const xBase = (col / cols) * 100 + (100 / cols / 2);
        const yBase = (row / rows) * 100 + (100 / rows / 2);

        return {
            id: Math.random().toString(36).substr(2, 9),
            initialXPercent: xBase + (Math.random() - 0.5) * 15,
            initialYPercent: yBase + (Math.random() - 0.5) * 15,
            size: Math.random() * 20 + 35, // Slightly smaller
            duration: 8 + Math.random() * 6,
            delay: Math.random() * 5,
            rotation: (Math.random() - 0.5) * 30
        };
    });
};

const IconItem = memo(({ item, mouseX, mouseY, config, onPop, isGlowing }) => {
    const [popped, setPopped] = useState(false);

    const handleClick = (e) => {
        if (popped) return;
        e.preventDefault();
        e.stopPropagation();
        setPopped(true);
        onPop(item.name);
    };

    return (
        <AnimatePresence>
            {!popped && (
                <motion.div
                    className="absolute cursor-pointer pointer-events-auto will-change-transform floating-icon"
                    style={{
                        x: mouseX,
                        y: mouseY,
                        left: `${config.initialXPercent}%`,
                        top: `${config.initialYPercent}%`,
                        zIndex: isGlowing ? 45 : 40, 
                        animationDuration: `${config.duration}s`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: isGlowing ? 0.8 : 0.15, 
                        scale: isGlowing ? 1.1 : 1,
                        filter: isGlowing 
                            ? 'drop-shadow(0 0 10px rgba(56,189,248,0.6)) brightness(1.2)' 
                            : 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.2))'
                    }}
                    exit={{
                        opacity: 0,
                        scale: 2,
                        filter: "blur(20px)",
                        transition: { duration: 0.3 }
                    }}
                    transition={{
                        opacity: { duration: 1 }, 
                        scale: { duration: 1 },
                        filter: { duration: 1 },
                        default: { type: "spring", stiffness: 40, damping: 25 }
                    }}
                    whileHover={{
                        scale: 1.3,
                        opacity: 1, 
                        zIndex: 50,
                        filter: "brightness(1.5) drop-shadow(0 0 15px rgba(56,189,248,0.8))",
                        transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClick}
                >
                    <div className="relative group">
                        <Icon
                            icon={item.icon}
                            className="w-8 h-8 md:w-12 md:h-12 transition-all duration-300 pointer-events-none text-white/90"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

const ScoreBoard = ({ score, lastCollected, isFinished }) => {
    return (
        <div className={`fixed bottom-20 md:bottom-6 right-6 z-[200] flex flex-col items-end gap-2 pointer-events-none select-none transition-opacity duration-500 ${isFinished ? 'opacity-0' : 'opacity-100'}`}>
            <AnimatePresence>
                {lastCollected && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        key={lastCollected.id}
                        className="text-accent font-bold text-lg bg-black/40 px-4 py-1 rounded-full border border-white/10 backdrop-blur-md"
                    >
                        + {lastCollected.name}
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="bg-black/40 border border-white/10 p-1 md:p-4 rounded-xl backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center gap-2 md:gap-4">
                <div className="flex flex-col">
                    <span className="text-[8px] md:text-[10px] text-muted font-bold uppercase tracking-[0.2em]">Tech Collected</span>
                    <span className="text-xl md:text-3xl font-mono font-bold text-white leading-none">
                        {score.toString().padStart(2, '0')}
                        <span className="text-xs md:text-sm text-slate-500 ml-1">/ {icons.length}</span>
                    </span>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-primary/5 rounded-full flex items-center justify-center border border-primary/20">
                    <Icon icon="game-icons:achievement" className="text-primary w-4 h-4 md:w-6 md:h-6 animate-pulse" />
                </div>
            </div>
        </div>
    );
};

const CongratsModal = ({ onReset }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="bg-slate-900/90 border border-primary/30 p-8 rounded-3xl shadow-[0_0_50px_rgba(56,189,248,0.3)] max-w-md w-full text-center relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                <motion.div
                    animate={{
                        rotate: [0, -10, 10, -10, 10, 0],
                        scale: [1, 1.2, 1.2, 1.2, 1.2, 1]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    className="flex justify-center mb-6"
                >
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                        <Icon icon="noto:trophy" className="w-16 h-16" />
                    </div>
                </motion.div>

                <h2 className="text-3xl font-bold text-white mb-2">Master Collector!</h2>
                <p className="text-slate-400 mb-8">
                    You've successfully collected all the technologies in my stack. You're ready to explore the portfolio!
                </p>

                <button
                    onClick={onReset}
                    className="group relative px-8 py-3 bg-primary text-white font-bold rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95"
                >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                    Play Again
                </button>
            </motion.div>
        </motion.div>
    );
};

const FloatingIcons = () => {
    const [mounted, setMounted] = useState(false);
    const [score, setScore] = useState(0);
    const [lastCollected, setLastCollected] = useState(null);
    const [showCongrats, setShowCongrats] = useState(false);
    const [gameKey, setGameKey] = useState(0);
    const [glowingIndex, setGlowingIndex] = useState(-1);

    const iconConfigs = useMemo(() => generateRandomPositions(icons.length), [gameKey]);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 40, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 40, damping: 30 });

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e) => {
            const factor = 40;
            x.set((e.clientX - window.innerWidth / 2) / factor);
            y.set((e.clientY - window.innerHeight / 2) / factor);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    // Random glow logic - Single icon at a time
    useEffect(() => {
        let timeoutId;
        
        const scheduleNextGlow = () => {
             // Random delay before picking next icon (1s to 4s)
             const delay = Math.random() * 3000 + 1000;
             
             timeoutId = setTimeout(() => {
                 // Pick random icon
                 const randomIndex = Math.floor(Math.random() * icons.length);
                 setGlowingIndex(randomIndex);
                 
                 // How long to stay glowing (1.5s to 2.5s)
                 const glowDuration = Math.random() * 1000 + 1500;
                 
                 setTimeout(() => {
                     setGlowingIndex(-1);
                     scheduleNextGlow();
                 }, glowDuration);
                 
             }, delay);
        };
        
        // Start the loop
        scheduleNextGlow();
        
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (score === icons.length && score !== 0) {
            setShowCongrats(true);

            // Fire confetti
            const duration = 3 * 1000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#38bdf8', '#818cf8', '#c084fc']
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#38bdf8', '#818cf8', '#c084fc']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();
        }
    }, [score]);

    const handlePop = useCallback((name) => {
        setScore(prev => prev + 1);
        setLastCollected({ name, id: Date.now() });
        setTimeout(() => setLastCollected(null), 2000);
    }, []);

    const resetGame = () => {
        setScore(0);
        setShowCongrats(false);
        setGameKey(prev => prev + 1);
        setGlowingIndex(-1);
    };

    if (!mounted) return null;

    return (
        <>
            <div key={gameKey} className="fixed inset-0 overflow-hidden pointer-events-none z-[100]">
                {icons.map((item, index) => (
                    <IconItem
                        key={`${gameKey}-${index}`}
                        item={item}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        config={iconConfigs[index]}
                        onPop={handlePop}
                        isGlowing={index === glowingIndex}
                    />
                ))}
            </div>

            <ScoreBoard score={score} lastCollected={lastCollected} isFinished={showCongrats} />

            <AnimatePresence>
                {showCongrats && <CongratsModal onReset={resetGame} />}
            </AnimatePresence>
        </>
    );
};

export default FloatingIcons;
