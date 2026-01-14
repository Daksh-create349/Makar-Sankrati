import { motion } from 'framer-motion';

const AmbientBackground = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            background: '#020617', // Base dark color
            overflow: 'hidden',
            pointerEvents: 'none'
        }}>
            {/* Orb 1: Sun Gold */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    width: '50vw',
                    height: '50vw',
                    background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                }}
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            {/* Orb 2: Kite Pink */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '40%',
                    right: '-10%',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                }}
                animate={{
                    x: [0, -50, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 2 }}
            />

            {/* Orb 3: Deep Sky Blue */}
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '-20%',
                    left: '20%',
                    width: '70vw',
                    height: '70vw',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.3, 1]
                }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay: 5 }}
            />

            {/* Noise Texture Overlay for "Film" Look */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.03,
                background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'0 0 2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            }} />
        </div>
    );
};

export default AmbientBackground;
