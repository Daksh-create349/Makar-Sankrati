'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../src/components/Hero';
import InfoSection from '../src/components/InfoSection';
import CustomCursor from '../src/components/CustomCursor';
import Particles from '../src/components/Particles';
import MusicPlayer from '../src/components/MusicPlayer';
import FestivalMap from '../src/components/FestivalMap';
import WishGenerator from '../src/components/WishGenerator';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function Home() {
    const lenisRef = useRef<Lenis | null>(null);

    // Day/Night Cycle State
    const [phase, setPhase] = useState<'night' | 'dawn' | 'day' | 'dusk'>('day');
    const [isNight, setIsNight] = useState(false);

    useEffect(() => {
        // Buttery Smooth Scroll Settings
        const lenis = new Lenis({
            duration: 3.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.6,
            touchMultiplier: 1.5,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // Cycle Timer
    useEffect(() => {
        const cycleDuration = 30000; // 30 seconds full cycle
        const startTime = Date.now();

        const updatePhase = () => {
            const elapsed = (Date.now() - startTime) % cycleDuration;
            const progress = elapsed / cycleDuration;

            // 0.0 - 0.20: Night
            // 0.20 - 0.35: Dawn
            // 0.35 - 0.65: Day
            // 0.65 - 0.80: Dusk
            // 0.80 - 1.00: Night

            let currentPhase: 'night' | 'dawn' | 'day' | 'dusk' = 'night';
            if (progress < 0.20) currentPhase = 'night';
            else if (progress < 0.35) currentPhase = 'dawn';
            else if (progress < 0.65) currentPhase = 'day';
            else if (progress < 0.80) currentPhase = 'dusk';
            else currentPhase = 'night';

            setPhase(currentPhase);
            setIsNight(currentPhase === 'night');
        };

        const interval = setInterval(updatePhase, 100);
        return () => clearInterval(interval);
    }, []);

    const getBackground = (p: string) => {
        switch (p) {
            case 'night': return 'linear-gradient(to bottom, #020617, #1e1b4b, #312e81)'; // Deep dark purple/blue
            case 'dawn': return 'linear-gradient(to bottom, #1e3a8a, #c2410c, #f97316)'; // Sunrise orange
            case 'day': return 'linear-gradient(to bottom, #2563eb, #3b82f6, #fcd34d)'; // Bright Day
            case 'dusk': return 'linear-gradient(to bottom, #1e3a8a, #be185d, #f59e0b)'; // Sunset pink/purple
            default: return 'linear-gradient(to bottom, #0f172a, #1e3a8a, #d97706)';
        }
    };

    return (
        <div className="app-container" style={{ position: 'relative', minHeight: '100vh' }}>
            <CustomCursor />
            <Particles />
            <MusicPlayer />

            {/* Global Theme Background */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
                animate={{
                    background: getBackground(phase)
                }}
                transition={{ duration: 5, ease: "easeInOut" }}
            >
                {/* Global Grain Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.15,
                    background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'0 0 2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                }} />

                {/* Stars for Night Mode */}
                <motion.div
                    animate={{ opacity: isNight ? 1 : 0 }}
                    transition={{ duration: 3 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 3px), radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 2px)',
                        backgroundSize: '550px 550px, 350px 350px',
                        backgroundPosition: '0 0, 40px 60px',
                        zIndex: -1
                    }}
                />
            </motion.div>

            {/* Scrollable Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Hero isNight={isNight} />
                <InfoSection />
                <FestivalMap />
                <WishGenerator isNight={isNight} />

                {/* Closing Greetings */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    style={{
                        minHeight: '60vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 10
                    }}
                >
                    <motion.h2
                        initial={{ scale: 0.8, y: 50, filter: 'blur(10px)' }}
                        whileInView={{ scale: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        style={{
                            fontSize: 'clamp(3rem, 8vw, 6rem)',
                            fontWeight: 900,
                            margin: 0,
                            background: isNight
                                ? 'linear-gradient(to right, #fcd34d, #f59e0b, #d97706)' // Gold still looks good at night
                                : 'linear-gradient(to right, #fcd34d, #f59e0b, #d97706)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 20px rgba(245, 158, 11, 0.5))',
                            lineHeight: 1.2
                        }}
                    >
                        तिळगूळ घ्या,<br />गोड गोड बोला
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        style={{
                            fontSize: '1.5rem',
                            marginTop: '20px',
                            color: '#e2e8f0',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            opacity: 0.8
                        }}
                    >
                        "Tilgud Ghya, God God Bola"
                    </motion.p>
                </motion.div>

                {/* Footer */}
                <footer style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    color: isNight ? '#93c5fd' : '#1e3a8a',
                    textAlign: 'center',
                    padding: '40px',
                    borderTop: '1px solid rgba(255,255,255,0.2)',
                    transition: 'color 3s'
                }}>
                    <p>© 2026 Makar Sankranti Special. Made with ❤️ and Kites.</p>
                </footer>
            </div>
        </div>
    )
}
