import React, { useEffect, useState, useMemo, memo } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

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

const IconItem = memo(({ item, mouseX, mouseY, config, onPop }) => {
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
                        zIndex: 100, // Very high z-index
                        animationDuration: `${config.duration}s`
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 0.5, // Balanced opacity
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 2,
                        filter: "blur(20px)",
                        transition: { duration: 0.3 }
                    }}
                    transition={{
                        opacity: { duration: 0.8 },
                        scale: { duration: 0.5 },
                        default: { type: "spring", stiffness: 40, damping: 25 }
                    }}
                    whileHover={{
                        scale: 1.3,
                        opacity: 1,
                        filter: "brightness(1.5) drop-shadow(0 0 15px rgba(56,189,248,0.8))",
                        transition: { duration: 0.2 }
                    }}
                    onClick={handleClick}
                >
                    <Icon
                        icon={item.icon}
                        width={config.size}
                        height={config.size}
                        className="transition-all duration-300 pointer-events-none"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
});

const ScoreBoard = ({ score, lastCollected }) => {
    return (
        <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-2 pointer-events-none select-none">
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
            <div className="bg-black/40 border border-white/10 p-4 rounded-xl backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center gap-4">
                <div className="flex flex-col">
                    <span className="text-[10px] text-muted font-bold uppercase tracking-[0.2em]">Tech Collected</span>
                    <span className="text-3xl font-mono font-bold text-white leading-none">
                        {score.toString().padStart(2, '0')}
                        <span className="text-sm text-slate-500 ml-1">/ {icons.length}</span>
                    </span>
                </div>
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center border border-primary/20">
                    <Icon icon="game-icons:achievement" className="text-primary w-6 h-6 animate-pulse" />
                </div>
            </div>
        </div>
    );
};

const FloatingIcons = () => {
    const [mounted, setMounted] = useState(false);
    const [score, setScore] = useState(0);
    const [lastCollected, setLastCollected] = useState(null);

    const iconConfigs = useMemo(() => generateRandomPositions(icons.length), []);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 40, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 40, damping: 30 });

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e) => {
            // Parallax intensity control - keep it subtle
            const factor = 40;
            x.set((e.clientX - window.innerWidth / 2) / factor);
            y.set((e.clientY - window.innerHeight / 2) / factor);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    const handlePop = (name) => {
        setScore(prev => prev + 1);
        setLastCollected({ name, id: Date.now() });
        setTimeout(() => setLastCollected(null), 2000);
    };

    if (!mounted) return null;

    return (
        <>
            {/* Clickable layer - z-index high to ensure clicks but pointer-events-none on parent */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[100]">
                {icons.slice(0, icons.length).map((item, index) => (
                    <IconItem
                        key={index}
                        item={item}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        config={iconConfigs[index]}
                        onPop={handlePop}
                    />
                ))}
            </div>
            <ScoreBoard score={score} lastCollected={lastCollected} />
        </>
    );
};

export default FloatingIcons;
