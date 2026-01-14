import React from 'react';
import { motion } from 'framer-motion';

interface KiteProps {
    color?: string;
    size?: number;
    x?: number | string;
    y?: number | string;
    delay?: number;
    duration?: number;
}

const Kite: React.FC<KiteProps> = ({
    color = '#ef4444',
    size = 100,
    x = '50%',
    y = '50%',
    delay = 0,
    duration = 3
}) => {
    return (
        <motion.div
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: size,
                height: size * 1.2,
                marginLeft: -size / 2, // Center horizontally
                marginTop: -size * 0.6, // Center vertically (half of height)
                zIndex: 10,
                transformOrigin: '50% 80%' // Rotate from near the bottom where string attaches
            }}
            initial={{ y: 100, opacity: 0, scale: 0.5 }}
            animate={{
                y: [0, -15, 0],
                x: [0, 10, -10, 0],
                rotate: [0, 5, -5, 0],
                opacity: 1,
                scale: 1
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay
            }}
        >
            {/* Kite Body */}
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: color,
                    clipPath: 'polygon(50% 0%, 100% 35%, 50% 100%, 0% 35%)',
                    filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.3))', // Better shadow with clip-path
                    position: 'relative'
                }}
            >
                {/* Cross bars */}
                <div style={{
                    position: 'absolute',
                    top: '35%',
                    left: 0,
                    right: 0,
                    height: 1,
                    background: 'rgba(255,255,255,0.6)'
                }} />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '50%',
                    width: 1,
                    background: 'rgba(255,255,255,0.6)'
                }} />
            </div>

            {/* Tail */}
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: -size * 0.4, // Overlap slightly
                    left: '50%',
                    width: size * 0.15,
                    height: size * 0.5,
                    background: color,
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    transform: 'translateX(-50%)',
                    transformOrigin: 'top center'
                }}
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: "easeInOut"
                }}
            />

            {/* String */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '80%', // Attach lower on the body
                    left: '50%',
                    width: 2,
                    height: 600,
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)',
                    transformOrigin: 'top center',
                    marginLeft: -1
                }}
                animate={{ rotateZ: [-2, 2, -2] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                }}
            />
        </motion.div>
    );
};

export default Kite;
