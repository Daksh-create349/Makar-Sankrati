import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CinematicSection from './CinematicSection';

const kitesImg = '/assets/kites.png';
const sweetsImg = '/assets/sweets.png';
const sunArtImg = '/assets/sun_art.png';

const HorizontalScroll = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

    const cards = [
        {
            title: "Scientific Significance",
            desc: "Unlike lunar festivals, Makar Sankranti follows the solar cycle. It marks the sun's journey northward (Uttarayan).",
            img: sunArtImg,
            color: '#fbbf24' // Updated to Match Golden Sun
        },
        {
            title: "Health Benefits",
            desc: "Kite flying in the early morning sun provides essential Vitamin D, boosting immunity for the coming season.",
            img: kitesImg,
            color: '#f87171'
        },
        {
            title: "Sweet Traditions",
            desc: '"Til-Gul Ghya, God God Bola." Sesame and jaggery sweets keep the body warm during the winter chill.',
            img: sweetsImg,
            color: '#facc15'
        }
    ];

    return (
        // Adjusted height to 300vh to fit content snugly without excessive empty scrolling
        <section ref={targetRef} style={{ height: '300vh', position: 'relative' }}>
            <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'transparent' }}>
                <motion.div style={{ x, display: 'flex', gap: '50px', paddingLeft: '100px', width: 'max-content' }}>

                    {cards.map((card, i) => (
                        <div key={i} style={{
                            minWidth: '80vw',
                            height: '70vh',
                            borderRadius: 30,
                            padding: 40,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(0,0,0,0.3)', // Ensure card is visible even without image load
                            backdropFilter: 'blur(10px)'
                        }}>
                            {/* Background Image */}
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundImage: `url(${card.img})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    zIndex: 0
                                }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                            />
                            {/* Gradient Overlay */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.4), transparent)',
                                zIndex: 1
                            }} />

                            {/* Content */}
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <h2 style={{ fontSize: '5rem', color: card.color, margin: 0, textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>{card.title}</h2>
                                <p style={{ fontSize: '2rem', maxWidth: '800px', marginTop: 20, color: '#e2e8f0', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                                    {card.desc}
                                </p>
                            </div>
                        </div>
                    ))}

                </motion.div>
            </div>
        </section>
    );
}

const InfoSection = () => {
    return (
        <div style={{ position: 'relative', zIndex: 10, color: 'white' }}>

            {/* Impact Statement */}
            <CinematicSection background="transparent">
                <div style={{ textAlign: 'center', padding: 20 }}>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.8, y: 100 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, type: 'spring' }}
                        style={{
                            fontSize: '12vw',
                            lineHeight: 0.9,
                            margin: 0,
                            color: '#ffffff',
                            fontWeight: 900,
                            textShadow: '0 10px 30px rgba(0,0,0,0.3), 0 0 10px rgba(255,255,255,0.5)',
                            letterSpacing: '-0.05em'
                        }}
                    >
                        THE SUN
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.2, type: 'spring' }}
                        style={{ marginTop: '-4vw' }}
                    >
                        <span style={{
                            fontSize: '15vw',
                            lineHeight: 0.9,
                            fontWeight: 900,
                            color: '#f59e0b', // Fallback
                            background: 'linear-gradient(to bottom, #fcd34d 0%, #d97706 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 10px 20px rgba(217, 119, 6, 0.4))',
                            letterSpacing: '-0.05em',
                            display: 'inline-block'
                        }}>
                            RETURNS
                        </span>
                    </motion.div>
                </div>
            </CinematicSection>

            {/* Horizontal Scroll Story */}
            <HorizontalScroll />

        </div>
    );
};

export default InfoSection;
