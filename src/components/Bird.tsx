import { motion } from 'framer-motion';
import React from 'react';

interface BirdProps {
    y: number | string;
    delay?: number;
    duration?: number;
    scale?: number;
}

const Bird: React.FC<BirdProps> = ({ y, delay = 0, duration = 15, scale = 1 }) => {
    return (
        <motion.div
            style={{
                position: 'absolute',
                top: y,
                left: -50,
                zIndex: 2,
                scale: scale,
                opacity: 0.7
            }}
            initial={{ x: '-10vw' }}
            animate={{ x: '110vw' }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: 'linear',
                delay: delay
            }}
        >
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    d="M2 10 Q 10 0, 20 10 Q 30 0, 38 10"
                    stroke="black"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ d: "M2 10 Q 10 5, 20 10 Q 30 5, 38 10" }}
                    animate={{ d: "M2 10 Q 10 15, 20 10 Q 30 15, 38 10" }}
                    transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: "easeInOut"
                    }}
                />
            </svg>
        </motion.div>
    );
};

export default Bird;
