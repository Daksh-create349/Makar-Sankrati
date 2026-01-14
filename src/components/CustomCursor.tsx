import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    return (
        <motion.div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 9999,
                pointerEvents: "none",
                mixBlendMode: "difference" // Creates that cool inverted effect
            }}
            animate={{ x: mousePosition.x - 10, y: mousePosition.y - 10 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
            <div style={{
                width: 20,
                height: 20,
                background: 'white',
                borderRadius: '50%',
                boxShadow: '0 0 20px rgba(255,255,255,0.8)'
            }} />
            <div style={{
                width: 40,
                height: 40,
                border: '1px solid white',
                borderRadius: '50%',
                position: 'absolute',
                top: -10,
                left: -10,
                opacity: 0.5,
                scale: 0.8
            }} />
        </motion.div>
    );
};

export default CustomCursor;
