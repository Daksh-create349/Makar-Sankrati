import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Kite from './Kite';
import Bird from './Bird';
import Cloud from './Cloud';
import SkyLantern from './SkyLantern';

interface HeroProps {
    isNight?: boolean;
}

const Hero: React.FC<HeroProps> = ({ isNight = false }) => {
    const [kites, setKites] = useState<{ id: number, x: string, y: string, color: string, size: number, delay: number, type: 'kite' | 'lantern' }[]>([]);
    const [introFinished, setIntroFinished] = useState(false);

    const [textIndex, setTextIndex] = useState(0);

    const greetings = [
        { title: "HAPPY MAKAR SANKRANTI", subtitle: "मकर संक्रांतीच्या हार्दिक शुभेच्छा" },
        { title: "HAPPY LOHRI", subtitle: "ਲੋਹੜੀ ਦੀਆਂ ਲੱਖ ਲੱਖ ਵਧਾਈਆਂ" },
        { title: "HAPPY PONGAL", subtitle: "இனிய பொங்கல் நல்வாழ்த்துக்கள்" },
        { title: "HAPPY UTTARAYAN", subtitle: "ઉતરાયણ ની શુભકામના" },
        { title: "HAPPY MAGH BIHU", subtitle: "ভোগালী বিহুৰ শুভেচ্ছা থাকিল" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % greetings.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [greetings.length]);

    // Initial Spawns
    useEffect(() => {
        setKites([]);

        const initialItems = isNight ? [
            // Lanterns positions
            { id: 1, x: '20%', y: '60%', color: '#f97316', size: 80, delay: 0.5, type: 'lantern' },
            { id: 2, x: '50%', y: '80%', color: '#fbbf24', size: 100, delay: 1, type: 'lantern' },
            { id: 3, x: '80%', y: '70%', color: '#ea580c', size: 90, delay: 1.5, type: 'lantern' },
            { id: 4, x: '35%', y: '90%', color: '#fcd34d', size: 70, delay: 2, type: 'lantern' },
        ] : [
            // Kites positions
            { id: 1, x: '15%', y: '25%', color: '#ef4444', size: 120, delay: 2.5, type: 'kite' },
            { id: 2, x: '85%', y: '20%', color: '#f59e0b', size: 100, delay: 3, type: 'kite' },
            { id: 3, x: '50%', y: '15%', color: '#3b82f6', size: 90, delay: 3.5, type: 'kite' },
            { id: 4, x: '70%', y: '40%', color: '#10b981', size: 130, delay: 4, type: 'kite' },
            { id: 5, x: '25%', y: '45%', color: '#8b5cf6', size: 110, delay: 4.5, type: 'kite' },
        ];

        // @ts-ignore
        setKites(initialItems);

        const timer = setTimeout(() => {
            setIntroFinished(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, [isNight]);

    const addFlyingObject = (e: React.MouseEvent) => {
        if (!introFinished) return;

        const colors = isNight
            ? ['#f97316', '#fbbf24', '#f59e0b', '#ea580c', '#fdba74']
            : ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f43f5e', '#06b6d4'];

        const newSize = 80 + Math.random() * 60;
        const x = e.clientX;
        const y = e.clientY;

        const isOverlapping = kites.some(k => {
            const kx = parseFloat(k.x as string);
            const ky = parseFloat(k.y as string);
            const dist = Math.sqrt(Math.pow(x - kx, 2) + Math.pow(y - ky, 2));
            return dist < 60;
        });

        if (isOverlapping) return;

        const newItem = {
            id: Date.now(),
            x: `${x}px`,
            y: `${y}px`,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: newSize,
            delay: 0,
            type: isNight ? 'lantern' : 'kite'
        };
        // @ts-ignore
        setKites((prev) => [...prev, newItem]);
    };

    return (
        <motion.div
            className="hero-section"
            onClick={addFlyingObject}
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                cursor: introFinished ? 'pointer' : 'default',
                fontFamily: "'Outfit', sans-serif"
            }}
        >
            <AnimatePresence mode='wait'>
                {isNight ? (
                    <motion.div
                        key="moon"
                        initial={{ opacity: 0, top: '20%' }}
                        animate={{ opacity: 1, top: '15%' }}
                        exit={{ opacity: 0, top: '10%' }}
                        transition={{ duration: 2 }}
                        style={{
                            position: 'absolute',
                            right: '15%',
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            background: '#fef3c7',
                            boxShadow: '0 0 40px #fef3c7, 0 0 10px #fff inset',
                            zIndex: 1
                        }}
                    >
                        <div style={{ position: 'absolute', top: '30%', left: '20%', width: 20, height: 20, background: 'rgba(0,0,0,0.05)', borderRadius: '50%' }} />
                        <div style={{ position: 'absolute', top: '60%', left: '60%', width: 30, height: 30, background: 'rgba(0,0,0,0.05)', borderRadius: '50%' }} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        style={{
                            position: 'absolute',
                            bottom: '-20%',
                            right: '10%',
                            width: 150,
                            height: 150,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, #fff 0%, #fcd34d 40%, #f59e0b 100%)',
                            boxShadow: '0 0 60px #fbbf24, 0 0 100px #f59e0b',
                            zIndex: 1
                        }}
                        initial={{ bottom: '-20%' }}
                        animate={{
                            bottom: ['-20%', '60%', '75%'],
                            right: ['10%', '15%', '20%'],
                            scale: [0.8, 1.2, 1]
                        }}
                        exit={{ opacity: 0, bottom: '100%' }}
                        transition={{ duration: 5, ease: "easeOut" }}
                    >
                        <motion.div
                            style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.1, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!isNight && (
                    <motion.div exit={{ opacity: 0 }} transition={{ duration: 2 }}>
                        <Bird y="20%" delay={5} duration={25} scale={0.8} />
                        <Bird y="15%" delay={8} duration={28} scale={0.6} />
                        <Bird y="30%" delay={15} duration={22} scale={0.9} />
                        <Bird y="10%" delay={2} duration={30} scale={0.5} />
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ opacity: isNight ? 0.3 : 1, transition: 'opacity 3s' }}>
                <Cloud top="15%" left="-20%" delay={0.5} duration={40} />
                <Cloud top="10%" left="-10%" delay={20} duration={45} scale={0.8} opacity={0.6} />
                <Cloud top="25%" left="-30%" delay={10} duration={35} scale={1.2} />
                <Cloud top="40%" left="-15%" delay={5} duration={50} opacity={0.4} />
            </div>

            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 50,
                pointerEvents: 'none',
                width: '100%'
            }}>
                <div style={{ overflow: 'hidden', padding: '10px 0', minHeight: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={textIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <h1 style={{
                                fontSize: 'clamp(3rem, 8vw, 6rem)',
                                fontWeight: 800,
                                margin: 0,
                                background: isNight
                                    ? 'linear-gradient(to bottom, #fff, #93c5fd)'
                                    : 'linear-gradient(to bottom, #ffffff, #fef3c7)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-2px',
                                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
                                lineHeight: 1.1,
                                textAlign: 'center'
                            }}>
                                {greetings[textIndex].title}
                            </h1>
                            <h2 style={{
                                fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                                fontWeight: 400,
                                margin: '10px 0',
                                color: isNight ? '#93c5fd' : '#fef3c7',
                                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                fontFamily: "'Noto Sans', sans-serif"
                            }}>
                                {greetings[textIndex].subtitle}
                            </h2>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <motion.div
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!introFinished) return;

                        const count = 8;
                        const colors = isNight
                            ? ['#f97316', '#fbbf24', '#f59e0b', '#ea580c']
                            : ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f43f5e', '#06b6d4'];

                        const newItems = Array.from({ length: count }).map((_, i) => ({
                            id: Date.now() + i,
                            x: `${10 + Math.random() * 80}%`,
                            y: isNight ? '90%' : `${20 + Math.random() * 60}%`,
                            color: colors[Math.floor(Math.random() * colors.length)],
                            size: 60 + Math.random() * 60,
                            delay: i * 0.2,
                            type: isNight ? 'lantern' as const : 'kite' as const
                        }));
                        // @ts-ignore
                        setKites(prev => [...prev, ...newItems]);
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 3, duration: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        marginTop: 30,
                        display: 'inline-block',
                        background: 'rgba(0,0,0,0.3)',
                        padding: '12px 30px',
                        borderRadius: 30,
                        color: 'rgba(255,255,255,0.95)',
                        fontSize: '1.2rem',
                        backdropFilter: 'blur(5px)',
                        cursor: introFinished ? 'pointer' : 'default',
                        pointerEvents: 'auto',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}
                >
                    {introFinished
                        ? (isNight ? "Tap to Light Lanterns ✨" : "Tap to Launch Celebration 🚀")
                        : "Loading festival vibes..."}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4, duration: 1 }}
                    style={{ marginTop: 20 }}
                >
                    <div className="scroll-indicator" style={{
                        width: 30,
                        height: 50,
                        border: '2px solid rgba(255,255,255,0.5)',
                        borderRadius: 15,
                        margin: '0 auto',
                        position: 'relative'
                    }}>
                        <motion.div
                            style={{
                                width: 4,
                                height: 8,
                                background: 'white',
                                borderRadius: 2,
                                position: 'absolute',
                                top: 5,
                                left: '50%',
                                marginLeft: -2
                            }}
                            animate={{ top: [5, 25, 5] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {kites.map((item) => (
                    item.type === 'lantern' ? (
                        <SkyLantern
                            key={item.id}
                            {...item}
                        />
                    ) : (
                        <Kite
                            key={item.id}
                            {...item}
                        />
                    )
                ))}
            </AnimatePresence>

            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 50% 50%, transparent 50%, rgba(0,0,0,0.3) 100%)',
                    pointerEvents: 'none',
                    zIndex: 40
                }}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 4 }}
            />
        </motion.div>
    );
}

export default Hero;
