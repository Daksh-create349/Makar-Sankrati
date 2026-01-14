import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CinematicSection from './CinematicSection';

interface WishGeneratorProps {
    isNight?: boolean;
}

const WishGenerator: React.FC<WishGeneratorProps> = ({ isNight = false }) => {
    const [name, setName] = useState('');
    const [wishing, setWishing] = useState(false);
    const [generated, setGenerated] = useState(false);

    const handleWish = (e: React.FormEvent) => {
        e.preventDefault();
        setWishing(true);
        setTimeout(() => {
            setWishing(false);
            setGenerated(true);
        }, 2000);
    };

    return (
        <CinematicSection background="transparent">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                zIndex: 10
            }}>
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    style={{
                        fontSize: '5vw',
                        color: 'white',
                        textAlign: 'center',
                        marginBottom: 40,
                        textShadow: '0 4px 10px rgba(0,0,0,0.3)'
                    }}
                >
                    {isNight ? "LIGHT A SKY LANTERN" : "SEND A PAPER KITE"}
                </motion.h2>

                {!generated ? (
                    <motion.form
                        onSubmit={handleWish}
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            padding: 40,
                            borderRadius: 30,
                            border: '1px solid rgba(255,255,255,0.2)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 20,
                            width: 'min(90%, 500px)',
                            position: 'relative',
                            zIndex: 20
                        }}
                    >
                        <input
                            type="text"
                            placeholder={isNight ? "Your Name on the Light" : "Your Name on the Kite"}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            style={{
                                padding: '15px 20px',
                                borderRadius: 15,
                                border: 'none',
                                background: 'rgba(255,255,255,0.9)',
                                fontSize: '1.2rem',
                                color: '#1e3a8a',
                                outline: 'none'
                            }}
                            required
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            style={{
                                padding: '15px 20px',
                                borderRadius: 15,
                                border: 'none',
                                background: isNight
                                    ? 'linear-gradient(135deg, #f97316, #ea580c)'
                                    : 'linear-gradient(135deg, #f59e0b, #ef4444)',
                                color: 'white',
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: isNight
                                    ? '0 4px 15px rgba(249, 115, 22, 0.4)'
                                    : '0 4px 15px rgba(245, 158, 11, 0.4)'
                            }}
                        >
                            {wishing
                                ? (isNight ? 'Releasing...' : 'Flying...')
                                : (isNight ? 'Release Lantern' : 'Fly My Wish')}
                        </motion.button>
                    </motion.form>
                ) : (
                    isNight ? (
                        // LANTERN RESULT
                        <motion.div
                            initial={{ scale: 0.5, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            style={{
                                width: 200,
                                height: 280,
                                background: 'linear-gradient(to bottom, #fbbf24, #f97316)',
                                borderRadius: '40px 40px 20px 20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 50px rgba(251, 191, 36, 0.6), 0 0 20px rgba(251, 191, 36, 0.8) inset',
                                position: 'relative'
                            }}
                        >
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'radial-gradient(circle at 50% 60%, rgba(255,255,255,0.8), transparent 70%)',
                                    borderRadius: 'inherit',
                                    filter: 'blur(20px)',
                                    zIndex: 0
                                }}
                                animate={{ opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            <div style={{ zIndex: 1, textAlign: 'center', color: '#7c2d12', padding: 20 }}>
                                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, opacity: 0.8 }}>Shining Bright</p>
                                <h3 style={{ margin: '15px 0', fontSize: '2rem', fontWeight: 900, textShadow: '0 2px 4px rgba(255,255,255,0.4)' }}>{name}</h3>
                                <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7 }}>2026</p>
                            </div>

                            <button
                                onClick={() => { setGenerated(false); setName(''); }}
                                style={{
                                    position: 'absolute',
                                    bottom: -60,
                                    background: 'white',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: 20,
                                    cursor: 'pointer',
                                    color: '#ea580c',
                                    fontWeight: 700
                                }}
                            >
                                Light Another
                            </button>
                        </motion.div>
                    ) : (
                        // KITE RESULT
                        <motion.div
                            initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            style={{
                                width: 300,
                                height: 300,
                                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                                transform: 'rotate(45deg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '10px 50px 10px 50px',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                                position: 'relative'
                            }}
                        >
                            <div style={{ transform: 'rotate(-45deg)', textAlign: 'center', color: 'white' }}>
                                <p style={{ margin: 0, fontSize: '1.2rem', opacity: 0.9 }}>Happy Makar Sankranti</p>
                                <h3 style={{ margin: '10px 0', fontSize: '2.5rem', fontWeight: 800 }}>{name}</h3>
                                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>2026</p>
                            </div>

                            {/* String */}
                            <div style={{
                                position: 'absolute',
                                bottom: -200,
                                right: 150,
                                width: 2,
                                height: 300,
                                background: 'rgba(255,255,255,0.5)',
                                transform: 'rotate(-45deg)'
                            }} />

                            <button
                                onClick={() => { setGenerated(false); setName(''); }}
                                style={{
                                    position: 'absolute',
                                    bottom: -80,
                                    left: '50%',
                                    transform: 'translateX(-50%) rotate(-45deg)', // Counter rotate container
                                    background: 'white',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: 20,
                                    cursor: 'pointer',
                                    color: '#8b5cf6',
                                    fontWeight: 700
                                }}
                            >
                                Send Another
                            </button>
                        </motion.div>
                    )
                )}
            </div>
        </CinematicSection>
    );
}

export default WishGenerator;
