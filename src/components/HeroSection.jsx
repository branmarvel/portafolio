import { motion, useMotionTemplate, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { slowMechanicalSpring } from '../utils/motion';
import { useLanguage } from '../context/LanguageContext';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

// Glitch/Scramble Text Component
function ScrambleText({ text }) {
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
        let iteration = 0;
        let interval = null;

        const startScramble = () => {
            clearInterval(interval);
            iteration = 0;
            interval = setInterval(() => {
                setDisplayText(text.split('').map((letter, index) => {
                    if (index < iteration) {
                        return text[index];
                    }
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join(''));

                if (iteration >= text.length) {
                    clearInterval(interval);
                }
                iteration += 1 / 3;
            }, 30);
        };

        startScramble();
        return () => clearInterval(interval);
    }, [text]);

    return <span>{displayText}</span>;
}

export default function HeroSection() {
    const { t } = useLanguage();
    const prefersReducedMotion = useReducedMotion();

    // Mouse tracking variables
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.5 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.5 });

    const cursorBackground = useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, rgba(255, 215, 170, 0.05), transparent 80%)`;

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        if (!prefersReducedMotion) {
            window.addEventListener('mousemove', handleMouseMove);
        }
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY, prefersReducedMotion]);

    return (
        <section id="home" className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden">
            {/* Background illumination tracking cursor */}
            {!prefersReducedMotion && (
                <motion.div
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{ background: cursorBackground }}
                />
            )}

            {/* Grid Pattern Background */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={slowMechanicalSpring}
                className="relative z-10 text-center max-w-4xl px-6 mix-blend-difference pointer-events-none"
            >
                <motion.span
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    className="font-mono text-[var(--color-text-secondary)] tracking-widest text-sm uppercase mb-6 block"
                >
                    Hola, soy
                </motion.span>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-gradient font-mono">
                    <ScrambleText text="BRANDON BELLO" />
                </h1>
                <motion.h2
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    className="text-2xl md:text-4xl font-light text-[var(--color-text-secondary)] mb-8"
                >
                    Full Stack Developer
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-3 font-mono text-xs uppercase text-[var(--color-tungsten)]"
                >
                    <span className="px-3 py-1 border border-[var(--color-border)] rounded-full">Angular</span>
                    <span className="px-3 py-1 border border-[var(--color-border)] rounded-full">Vue.js</span>
                    <span className="px-3 py-1 border border-[var(--color-border)] rounded-full">Laravel</span>
                    <span className="px-3 py-1 border border-[var(--color-border)] rounded-full">Node.js</span>
                    <span className="px-3 py-1 border border-[var(--color-border)] rounded-full">AWS</span>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                    className="mt-12 text-lg text-[var(--color-text-secondary)] font-light max-w-2xl mx-auto"
                >
                    Apasionado por crear soluciones web elegantes y funcionales, construyendo arquitecturas robustas desde Caracas, Venezuela.
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto"
            >
                <span className="text-[var(--color-text-secondary)] font-mono text-xs uppercase tracking-widest">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-px h-12 bg-gradient-to-b from-[var(--color-tungsten)] to-transparent"
                />
            </motion.div>
        </section>
    );
}
