import React from 'react';
import { motion } from 'framer-motion';

interface SkyLanternProps {
    x?: number | string;
    y?: number | string;
    size?: number;
    delay?: number;
    color?: string;
    duration?: number;
}

const SkyLantern: React.FC<SkyLanternProps> = ({
    x = '50%',
    y = '80%',
    size = 100,
    delay = 0,
    color = '#f97316',
    duration = 10
}) => {
    return (
        <motion.div
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: size,
                height: size * 1.4,
                zIndex: 15,
                marginLeft: -size / 2,
            }}
            initial={{ opacity: 0, margin: 20 }} // Initial randomness
            animate={{
                y: [0, -window.innerHeight * 1.5], // Float way up
                x: [0, 15, -15, 10, 0], // Gentle sway
                opacity: [0, 1, 1, 0, 0],
                scale: [0.8, 1, 1, 0.8]
            }}
            transition={{
                y: { duration: duration, ease: "linear", delay: delay, repeat: Infinity },
                x: { duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
                opacity: { duration: duration, times: [0, 0.1, 0.8, 0.9, 1], delay: delay, repeat: Infinity },
                scale: { duration: duration, delay: delay, repeat: Infinity }
            }}
        >
            {/* Lantern Body */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Main Paper Shell */}
                <div style={{
                    flex: 1,
                    background: `linear-gradient(to bottom, ${color}, #ef4444)`,
                    borderRadius: '50% 50% 15% 15% / 60% 60% 10% 10%', // Lantern shape
                    boxShadow: `0 0 30px ${color}, 0 0 10px #f59e0b inset`,
                    position: 'relative',
                    overflow: 'hidden',
                    opacity: 0.9
                }}>
                    {/* Inner Glow Flicker */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            bottom: '10%',
                            left: '20%',
                            right: '20%',
                            height: '50%',
                            background: 'radial-gradient(circle, #fff, rgba(253, 224, 71, 0.5), transparent)',
                            filter: 'blur(8px)',
                            borderRadius: '50%'
                        }}
                        animate={{ opacity: [0.7, 1, 0.7], scale: [0.95, 1.05, 0.95] }}
                        transition={{ duration: 0.2 + Math.random() * 0.5, repeat: Infinity }}
                    />

                    {/* Horizontal Ribs */}
                    <div style={{ position: 'absolute', top: '25%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,0.1)' }} />
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,0.1)' }} />
                    <div style={{ position: 'absolute', top: '75%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,0.1)' }} />
                </div>

                {/* Bottom Rim */}
                <div style={{
                    height: size * 0.1,
                    width: '60%',
                    background: '#7c2d12',
                    margin: '0 auto',
                    borderRadius: '0 0 10px 10px'
                }} />
            </div>
        </motion.div>
    );
};

export default SkyLantern;
