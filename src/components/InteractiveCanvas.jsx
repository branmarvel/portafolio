import { useState, useRef, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { mechanicalSpring, slowMechanicalSpring } from '../utils/motion';
import ProjectLens from './ProjectLens';

const projects = [
    {
        id: 'p1',
        title: 'SISTEMA DE GESTIÓN Y CONTROL',
        role: 'Angular & Firebase',
        desc: 'Plataforma de gestión de proyectos, integrando Angular en el frontend y Firebase en el backend.',
        demoUrl: 'https://sgcp-app.web.app/#/login',
        videoUrl: 'https://www.youtube.com/embed/1_30YCtLpRo'
    },
    {
        id: 'p2',
        title: 'EDUCATIVO DIDÁCTICO',
        role: 'Flutter & Firebase',
        desc: 'Aplicación móvil educativa para profesores y estudiantes del I.U.J.O. desarrollada con Flutter.',
        demoUrl: 'https://u-text-app.web.app',
        videoUrl: 'https://www.youtube.com/embed/_rpIpp9s7Zo'
    },
    {
        id: 'p3',
        title: 'SISTEMA DE ALMACÉN AVANZADO',
        role: 'Laravel & Vue.js',
        desc: 'Sistema ERP para gestión de almacenes con integración PostgreSQL y frontend en Vue.js.',
        demoUrl: null,
        videoUrl: 'https://www.youtube.com/embed/gsz2Cx-1DYw'
    }
];

export default function InteractiveCanvas() {
    const [activeProject, setActiveProject] = useState(null);
    const containerRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();

    // Mouse tracking variables
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for mouse
    const springX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.5 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.5 });

    const cursorBackground = useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, rgba(255, 215, 170, 0.05), transparent 80%)`;

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        // Only add mouse tracking if not reduced motion
        if (!prefersReducedMotion) {
            window.addEventListener('mousemove', handleMouseMove);
        }
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY, prefersReducedMotion]);

    return (
        <div
            ref={containerRef}
            className="relative w-screen h-screen overflow-hidden bg-[var(--color-base)] text-white"
        >
            {/* Background illumination tracking cursor */}
            {!prefersReducedMotion && (
                <motion.div
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{ background: cursorBackground }}
                />
            )}

            {/* Grid Pattern Background */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Main Content constraints */}
            <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between p-8 md:p-24 pointer-events-none">

                {/* About Section - Static & Clean */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={slowMechanicalSpring}
                    className="max-w-md pointer-events-auto mix-blend-difference"
                >
                    <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-4 text-[var(--color-tungsten)]">
                        BRANDON<br />BELLO
                    </h1>
                    <p className="font-mono text-[var(--color-text-secondary)] text-sm uppercase tracking-widest mb-8">
            // Full Stack Developer
                    </p>
                    <div className="space-y-4 text-[var(--color-text-primary)] text-lg leading-relaxed font-light">
                        <p>
                            Construyendo soluciones web modernas y escalables desde Caracas, Venezuela.
                        </p>
                        <p className="text-[var(--color-text-secondary)]">
                            Creo firmemente en el poder de la tecnología para resolver problemas complejos y mejorar la vida de las personas, con un enfoque en aplicaciones eficaces y de alta disponibilidad.
                        </p>
                        <div className="flex gap-4 pt-4 font-mono text-xs text-[var(--color-tungsten)]">
                            <a href="https://www.linkedin.com/in/brandon-jose-bello-moncada-5826061a0" target="_blank" rel="noreferrer" className="hover:underline">LINKEDIN</a>
                            <a href="mailto:brandon91596@gmail.com" className="hover:underline">EMAIL</a>
                            <a href="https://api.whatsapp.com/send?phone=584123098258" target="_blank" rel="noreferrer" className="hover:underline">WHATSAPP</a>
                        </div>
                    </div>
                </motion.div>

                {/* Dynamic Project Lenses */}
                <div className="flex flex-col gap-12 mt-16 md:mt-0 pointer-events-auto mr-0 md:mr-24 items-end">
                    {projects.map((proj, index) => (
                        <ProjectLens
                            key={proj.id}
                            project={proj}
                            isActive={activeProject === proj.id}
                            onClick={() => setActiveProject(activeProject === proj.id ? null : proj.id)}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
