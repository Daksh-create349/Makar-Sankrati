import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music } from 'lucide-react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Using a reliable cultural track or placeholder. 
    // Since I can't browse, I'll use a placeholder path that the user should fill, 
    // but I'll add a simple "click" sound effect generator for immediate feedback.


    const togglePlay = () => {
        setIsPlaying(!isPlaying);

        if (!audioRef.current) return;

        // Try playing the file first
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Play started!
                if (isPlaying) audioRef.current?.pause(); // Toggle logic mismatch fix
            }).catch(() => {
                // Auto-play prevented or file missing. Fallback to Synth.
                console.log("Audio file failed or blocked. Starting Festival Synth...");
                playSynth(!isPlaying); // Start/Stop synth based on NEW state (which is !isPlaying from start of func)
            });
        }

        if (isPlaying) {
            audioRef.current.pause();
            stopSynth();
        }
    };

    // Web Audio API Synth fallback
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscRef = useRef<OscillatorNode[]>([]);
    const gainRef = useRef<GainNode | null>(null);

    const playSynth = (shouldPlay: boolean) => {
        if (!shouldPlay) {
            stopSynth();
            return;
        }
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        const ctx = audioContextRef.current;
        const gain = ctx.createGain();
        gain.gain.value = 0.1;
        gain.connect(ctx.destination);
        gainRef.current = gain;

        // Create a pleasant drone chord (C Major ish)
        const freqs = [130.81, 196.00, 261.63]; // C3, G3, C4
        freqs.forEach(f => {
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = f;
            osc.connect(gain);
            osc.start();
            oscRef.current.push(osc);
        });
    };

    const stopSynth = () => {
        oscRef.current.forEach(o => o.stop());
        oscRef.current = [];
        if (gainRef.current) {
            gainRef.current.disconnect();
            gainRef.current = null;
        }
    };

    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                gap: 15
            }}
        >
            <audio
                ref={audioRef}
                loop
                src="/assets/festival_bgm.mp3"
                onError={() => console.log("Audio not found, please add festival_bgm.mp3 to public/assets")}
            />

            <motion.div
                className="glass-panel"
                style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(12px)',
                    padding: '12px 20px',
                    borderRadius: 50,
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1 }}>FESTIVAL RADIO</span>
                    <span style={{ color: 'white', fontSize: '0.85rem' }}>Makar Sankranti FM</span>
                </div>

                <div style={{ width: 1, height: 25, background: 'rgba(255,255,255,0.2)' }} />

                <button
                    onClick={togglePlay}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', display: 'flex' }}
                >
                    {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                </button>

                <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isPlaying && (
                        <div className="equalizer" style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 16 }}>
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    style={{ width: 3, background: '#fbbf24' }}
                                    animate={{ height: [4, 16, 8, 14, 4] }}
                                    transition={{ duration: 0.5, repeat: Infinity, ease: 'linear', delay: i * 0.1 }}
                                />
                            ))}
                        </div>
                    )}
                    {!isPlaying && <Music size={16} color="rgba(255,255,255,0.5)" />}
                </div>

            </motion.div>
        </motion.div>
    );
};

export default MusicPlayer;
