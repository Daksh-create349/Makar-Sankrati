import { useRef, useEffect } from 'react';

const Particles = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles: Particle[] = [];
        const particleCount = 50;

        class Particle {
            x: number;
            y: number;
            size: number;
            speedY: number;
            speedX: number;
            color: string;
            rotation: number;
            rotationSpeed: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height - height; // Start above
                this.size = Math.random() * 8 + 4;
                this.speedY = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 1.5;
                // Festive colors: Gold, Red, Pink, bright Blue
                const colors = ['#fcd34d', '#f87171', '#f472b6', '#60a5fa', '#ffffff'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.rotation = Math.random() * 360;
                this.rotationSpeed = (Math.random() - 0.5) * 2;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5; // Sway
                this.rotation += this.rotationSpeed;

                if (this.y > height) {
                    this.y = -20;
                    this.x = Math.random() * width;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.rotation * Math.PI) / 180);
                ctx.fillStyle = this.color;
                // Draw a small square/confetti shape
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                ctx.restore();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 2
            }}
        />
    );
};

export default Particles;
