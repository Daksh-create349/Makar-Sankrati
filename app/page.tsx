'use client';

import { useRef, useEffect } from 'react';
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

    useEffect(() => {
        // Buttery Smooth Scroll Settings
        const lenis = new Lenis({
            duration: 3.0, // Extremely smooth, floaty feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.6, // Slower scrolling for "heavy" cinematic feel
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

    return (
        <div className="app-container" style={{ position: 'relative', minHeight: '100vh' }}>
            <CustomCursor />
            <Particles />
            <MusicPlayer />

            {/* Global Consistent Theme Background - Fixed */}
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
                // Using a "Rich Golden Hour" theme that is grand but not blindingly bright
                initial={{ background: 'linear-gradient(to bottom, #0f172a, #1e3a8a, #d97706)' }}
                animate={{
                    background: [
                        'linear-gradient(to bottom, #0f172a, #1e3a8a, #b45309)', // Early Morning / Late Evening (Darker)
                        'linear-gradient(to bottom, #1e3a8a, #2563eb, #d97706)', // Golden Hour
                        'linear-gradient(to bottom, #1e40af, #3b82f6, #f59e0b)', // Bright but deep Day
                        'linear-gradient(to bottom, #172554, #1e3a8a, #b45309)'  // Return to Evening
                    ]
                }}
                transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
            >
                {/* Global Grain Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.15,
                    background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'0 0 2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                }} />
            </motion.div>

            {/* Scrollable Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Hero />
                <InfoSection />
                <FestivalMap />
                <WishGenerator />

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
                            background: 'linear-gradient(to right, #fcd34d, #f59e0b, #d97706)',
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
                    background: 'rgba(255, 255, 255, 0.1)', // Glassy light footer for day theme
                    backdropFilter: 'blur(10px)',
                    color: '#1e3a8a', // Dark blue text for contrast
                    textAlign: 'center',
                    padding: '40px',
                    borderTop: '1px solid rgba(255,255,255,0.2)'
                }}>
                    <p>© 2026 Makar Sankranti Special. Made with ❤️ and Kites.</p>
                </footer>
            </div>
        </div>
    )
}
