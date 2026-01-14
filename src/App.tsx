import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import CustomCursor from './components/CustomCursor';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Buttery Smooth Scroll Settings
    const lenis = new Lenis({
      duration: 2.0, // Longer duration for more 'weight'
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Slower, more controlled
      touchMultiplier: 2,
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
    <div className="app-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <CustomCursor />

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
        initial={{ background: 'linear-gradient(to bottom, #020617, #1e1b4b, #312e81)' }} // Night
        animate={{
          background: [
            'linear-gradient(to bottom, #020617, #1e1b4b, #312e81)', // Deep Night
            'linear-gradient(to bottom, #172554, #1e3a8a, #7c2d12)', // Pre-dawn
            'linear-gradient(to bottom, #1e40af, #60a5fa, #f59e0b)', // Sunrise
            'linear-gradient(to bottom, #0ea5e9, #7dd3fc, #fcd34d)'  // Bright Day (Target Theme)
          ]
        }}
        transition={{ duration: 4, times: [0, 0.3, 0.6, 1], ease: "easeInOut" }}
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

export default App
