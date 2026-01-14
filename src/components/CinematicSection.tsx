import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
    children: React.ReactNode;
    background: string;
    sticky?: boolean;
}

const CinematicSection: React.FC<Props> = ({ children, background }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax background scale
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    // Opacity fade for content
    const y = useTransform(scrollYProgress, [0.3, 0.6], [50, 0]);
    const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

    return (
        <div ref={ref} style={{
            height: '100vh',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            // Snap snapping is tricky with Lenis, so we rely on design (100vh)
        }}>
            {/* Background Layer */}
            <motion.div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: background,
                scale: scale,
                zIndex: 0
            }}>
                {/* Abstract Grain/Texture */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.1,
                    background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'0 0 2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                }} />
            </motion.div>

            {/* Content Layer */}
            <motion.div style={{
                position: 'relative',
                zIndex: 10,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                y,
                opacity
            }}>
                {children}
            </motion.div>
        </div>
    );
};

export default CinematicSection;
