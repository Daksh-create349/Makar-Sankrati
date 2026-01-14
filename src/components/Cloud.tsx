import { motion } from 'framer-motion';
import React from 'react';

interface CloudProps {
    top: string | number;
    left?: string | number;
    scale?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
}

const Cloud: React.FC<CloudProps> = ({
    top,
    left = '-20%',
    scale = 1,
    opacity = 0.8,
    duration = 20,
    delay = 0
}) => {
    return (
        <motion.div
            style={{
                position: 'absolute',
                top: top,
                left: left,
                zIndex: 1,
                opacity: opacity,
                filter: 'blur(3px)', // Dreamy softness
            }}
            initial={{ x: '-20vw' }}
            animate={{ x: '120vw' }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: 'linear',
                delay: delay
            }}
        >
            <div style={{ position: 'relative', transform: `scale(${scale})` }}>
                {/* Main body */}
                <div style={{ width: 100, height: 40, background: '#fff', borderRadius: 20, position: 'absolute', top: 0, left: 0 }} />
                {/* Fluffs */}
                <div style={{ width: 50, height: 50, background: '#fff', borderRadius: '50%', position: 'absolute', top: -25, left: 15 }} />
                <div style={{ width: 40, height: 40, background: '#fff', borderRadius: '50%', position: 'absolute', top: -15, left: 50 }} />
            </div>
        </motion.div>
    );
};

export default Cloud;
