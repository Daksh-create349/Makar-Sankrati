import { motion } from 'framer-motion';
import CinematicSection from './CinematicSection';

const festivals = [
    { name: "Makar Sankranti", region: "Maharashtra / North India", color: "#f59e0b", desc: "Celebrated with kites and Til-gul sweets." },
    { name: "Pongal", region: "Tamil Nadu", color: "#ec4899", desc: "Honoring the Sun God with sweet rice Pongal." },
    { name: "Lohri", region: "Punjab", color: "#ef4444", desc: "Bonfires, dance, and popcorn offerings." },
    { name: "Magh Bihu", region: "Assam", color: "#8b5cf6", desc: "Community feasts and traditional games." },
    { name: "Uttarayan", region: "Gujarat", color: "#3b82f6", desc: "The biggest international kite festival." },
];

const FestivalMap = () => {
    return (
        <CinematicSection background="transparent">
            <div style={{ width: '100%', padding: '0 20px' }}>
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    style={{ textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'white', marginBottom: 50 }}
                >
                    ONE FESTIVAL, <span style={{ color: '#fbbf24' }}>MANY NAMES</span>
                </motion.h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 30,
                    maxWidth: 1200,
                    margin: '0 auto'
                }}>
                    {festivals.map((fest, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10, rotateX: 10, rotateY: 10 }}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 20,
                                padding: 30,
                                position: 'relative',
                                overflow: 'hidden',
                                transformStyle: 'preserve-3d',
                                perspective: 1000
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: -20,
                                right: -20,
                                width: 100,
                                height: 100,
                                background: fest.color,
                                filter: 'blur(40px)',
                                opacity: 0.5
                            }} />

                            <h3 style={{ fontSize: '2rem', margin: '0 0 10px 0', color: 'white' }}>{fest.name}</h3>
                            <span style={{
                                display: 'inline-block',
                                padding: '5px 12px',
                                borderRadius: 20,
                                background: 'rgba(255,255,255,0.1)',
                                color: fest.color,
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                marginBottom: 20
                            }}>
                                {fest.region}
                            </span>
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.6 }}>
                                {fest.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </CinematicSection>
    );
};

export default FestivalMap;
