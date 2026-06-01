import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { mechanicalSpring } from '../utils/motion';
import { useLanguage } from '../context/LanguageContext';

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 }
        }
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 }
        }
    })
};

export default function ProjectsSection() {
    const { t } = useLanguage();
    const [[page, direction], setPage] = useState([0, 0]);
    const [activeModal, setActiveModal] = useState(null);

    const projects = [
        {
            id: 'sgcp',
            title: t('projects.sgcpTitle'),
            role: t('projects.sgcpRole'),
            tags: ['Go (Golang)', 'PostgreSQL', 'JWT/RBAC', 'Astro', 'React Native'],
            description: t('projects.sgcpDesc'),
            demoUrl: 'https://sgcp-app.web.app/#/login',
            credentials: [
                { label: t('projects.sgcpCredUser'), value: 'admin@admin.com' },
                { label: t('projects.sgcpCredPass'), value: '123456' }
            ]
        },
        {
            id: 'utext',
            title: t('projects.utextTitle'),
            role: t('projects.utextRole'),
            tags: ['Laravel 11', 'Vue 3', 'Node.js', 'Socket.io', 'Docker'],
            description: t('projects.utextDesc'),
            demoUrl: 'https://u-text-app.web.app',
            credentials: [
                { label: t('projects.utextCredTeacher'), value: 'admin@admin.com', pass: '123456' },
                { label: t('projects.utextCredStudent'), value: 'student@student.com', pass: '123456' }
            ]
        },
        {
            id: 'erp',
            title: t('projects.erpTitle'),
            role: t('projects.erpRole'),
            tags: ['Flutter', 'Firebase', 'NestJS', 'TypeScript', 'Cloud Run'],
            description: t('projects.erpDesc'),
            demoUrl: null,
            credentials: null
        }
    ];

    const projectIndex = Math.abs(page % projects.length);
    const project = projects[projectIndex];

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <section id="projects" className="w-full h-full flex items-center justify-center px-4 md:px-12 relative overflow-hidden bg-[var(--color-base)]">

            {/* Header Overlay - Absolute */}
            <div className="absolute top-16 md:top-24 left-4 md:left-12 z-20">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-2 tracking-tighter"
                >
                    {t('projects.title')} <span className="text-[var(--color-tungsten)]">{t('projects.highlight')}</span>
                </motion.h2>
                <div className="flex gap-2">
                    {projects.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                const newDirection = idx > projectIndex ? 1 : -1;
                                setPage([idx, newDirection]);
                            }}
                            className={`h-1 transition-all duration-300 rounded cursor-pointer ${idx === projectIndex ? 'w-8 bg-[var(--color-tungsten)]' : 'w-2 bg-[var(--color-border)] hover:bg-white/50'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Navigation Buttons for Desktop */}
            <div className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 xl:right-24 z-20 flex-col gap-4 hidden md:flex pointer-events-auto">
                <button
                    onClick={() => paginate(-1)}
                    className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-tungsten)] hover:border-transparent hover:text-black transition-all group shrink-0"
                    aria-label="Previous project"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button
                    onClick={() => paginate(1)}
                    className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-tungsten)] hover:border-transparent hover:text-black transition-all group shrink-0"
                    aria-label="Next project"
                >
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>

            {/* Viewport for Sliders */}
            <div className="w-full max-w-7xl min-h-[75vh] sm:min-h-[65vh] lg:h-[65vh] mt-12 md:mt-24 pb-16 lg:pb-0 relative perspective-1000">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="relative lg:absolute lg:inset-0 w-full flex flex-col lg:flex-row gap-4 lg:gap-16 items-center"
                    >
                        {/* Video / Preview Card Side */}
                        <div className="w-full lg:w-[55%] h-52 sm:h-64 lg:h-full rounded-2xl md:rounded-3xl overflow-hidden glass-panel p-3.5 md:p-6 shadow-2xl relative group shrink-0 pointer-events-auto flex flex-col justify-between bg-black/40 border border-white/5">
                            {/* Mac Window Header Controls */}
                            <div className="flex items-center gap-1 md:gap-1.5 mb-2.5 md:mb-4 border-b border-white/5 pb-2 md:pb-3">
                                <span className="w-2 h-2 md:w-3.5 md:h-3.5 rounded-full bg-[#ff5f56] opacity-80" />
                                <span className="w-2 h-2 md:w-3.5 md:h-3.5 rounded-full bg-[#ffbd2e] opacity-80" />
                                <span className="w-2 h-2 md:w-3.5 md:h-3.5 rounded-full bg-[#27c93f] opacity-80" />
                                <span className="text-[8px] md:text-[10px] font-mono text-[var(--color-text-secondary)] ml-2 md:ml-3 tracking-widest">{project.id.toUpperCase()} // DASHBOARD_PREVIEW.sh</span>
                            </div>
                            
                            {/* Graphic Central Visualization */}
                            <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden rounded-xl bg-black/50 border border-white/5 p-2 md:p-4">
                                <div className="absolute -inset-10 bg-radial-gradient from-[var(--color-tungsten)]/10 to-transparent/0 opacity-30 blur-2xl group-hover:scale-125 transition-transform duration-1000" />
                                
                                <motion.div 
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="z-10 flex flex-col items-center text-center gap-1.5 md:gap-2"
                                >
                                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-tr from-[var(--color-tungsten)] to-amber-200/50 flex items-center justify-center shadow-lg text-black font-bold text-sm md:text-xl mb-1 md:mb-2">
                                        {project.title.charAt(0)}
                                    </div>
                                    <h4 className="text-white text-[11px] md:text-lg font-mono font-medium tracking-tight px-2">{project.title}</h4>
                                    <span className="font-mono text-[8px] md:text-xs text-[var(--color-tungsten)] uppercase tracking-wider">{project.role}</span>
                                </motion.div>
                                
                                {/* Dynamic floating glow lines */}
                                <div className="absolute inset-0 flex justify-between px-12 pointer-events-none opacity-20">
                                    <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--color-tungsten)] to-transparent" />
                                    <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
                                    <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--color-tungsten)] to-transparent" />
                                </div>
                            </div>
                            
                            {/* Terminal Prompt Footer */}
                            <div className="mt-2.5 md:mt-4 pt-2 md:pt-3 border-t border-white/5 font-mono text-[8px] md:text-xs text-[var(--color-text-secondary)] flex justify-between items-center w-full">
                                <span>STATUS: <span className="text-[#ff5f56] font-semibold">SECURE_PRODUCTION</span></span>
                                <span>NETWORK: PRIVATE_MINISTRY</span>
                            </div>
                        </div>

                        {/* Text & Details Side */}
                        <div className="w-full lg:w-[45%] flex flex-col justify-center h-full gap-3 lg:gap-6 mt-4 lg:mt-0 pointer-events-auto">
                            <div>
                                <span className="font-mono text-[var(--color-tungsten)] tracking-widest text-[10px] md:text-xs uppercase block mb-1 lg:mb-2">
                                    {project.role}
                                </span>
                                <h3 className="text-xl md:text-3xl lg:text-5xl font-bold tracking-tight leading-none mb-2 lg:mb-4">{project.title}</h3>
                            </div>

                            <p className="text-[var(--color-text-secondary)] leading-relaxed text-xs lg:text-base max-w-md line-clamp-4 lg:line-clamp-none">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-[#151515] border border-[var(--color-border)] rounded-full text-[10px] lg:text-xs font-mono text-white/80">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-3 mt-auto lg:mt-6">
                                {project.demoUrl && (
                                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="px-4 py-2 lg:px-6 lg:py-3 rounded-full bg-white text-black font-semibold text-xs lg:text-sm hover:scale-105 transition-transform flex items-center gap-2">
                                        {t('projects.demoBtn')}
                                        <svg className="w-3 h-3 lg:w-4 lg:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    </a>
                                )}
                                {project.credentials && (
                                    <button
                                        onClick={() => setActiveModal(project.id)}
                                        className="px-4 py-2 lg:px-6 lg:py-3 rounded-full border border-[var(--color-border)] text-xs lg:text-sm font-medium hover:bg-[var(--color-tungsten)] hover:text-black transition-colors"
                                    >
                                        {t('projects.credBtn')}
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Mobile Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 md:hidden z-20 pointer-events-auto">
                <button onClick={() => paginate(-1)} className="p-3 bg-[var(--color-surface)] rounded-full border border-[var(--color-border)] text-white hover:bg-[var(--color-surface-hover)]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>

                {/* Dots Indicator for Mobile */}
                <div className="flex gap-2">
                    {projects.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                const newDirection = idx > projectIndex ? 1 : -1;
                                setPage([idx, newDirection]);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === projectIndex ? 'bg-[var(--color-tungsten)] scale-125' : 'bg-[var(--color-border)]'}`}
                        />
                    ))}
                </div>

                <button onClick={() => paginate(1)} className="p-3 bg-[var(--color-surface)] rounded-full border border-[var(--color-border)] text-white hover:bg-[var(--color-surface-hover)]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>

            {/* Credentials Modal Overlay */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveModal(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 pointer-events-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={mechanicalSpring}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-panel max-w-sm w-full p-6 md:p-8 rounded-3xl border border-[var(--color-border)] relative shadow-2xl"
                        >
                            <button
                                onClick={() => setActiveModal(null)}
                                className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>

                            <h3 className="text-xl md:text-2xl font-bold mb-6">{t('projects.modalTitle')} <span className="text-[var(--color-tungsten)]">{t('projects.modalHighlight')}</span></h3>

                            <div className="flex flex-col gap-4 md:gap-6">
                                {projects.find(p => p.id === activeModal)?.credentials?.map((cred, i) => (
                                    <div key={i} className="flex flex-col gap-2 md:gap-3">
                                        <span className="font-mono text-[10px] md:text-xs uppercase text-[var(--color-text-secondary)]">{cred.label}</span>
                                        <div className="flex bg-[#000] border border-[var(--color-border)] rounded-xl overflow-hidden focus-within:border-[var(--color-tungsten)] transition-colors">
                                            <input type="text" value={cred.value} readOnly className="bg-transparent px-3 md:px-4 py-2 md:py-3 flex-1 text-xs md:text-sm outline-none text-white font-mono" />
                                            <button
                                                onClick={() => { navigator.clipboard.writeText(cred.value); }}
                                                className="px-3 md:px-4 py-2 md:py-3 hover:bg-[var(--color-tungsten)] hover:text-black transition-colors font-medium text-[10px] md:text-xs font-mono text-[var(--color-text-secondary)] border-l border-[var(--color-border)] cursor-pointer"
                                            >
                                                {t('projects.copyBtn')}
                                            </button>
                                        </div>
                                        {cred.pass && (
                                            <div className="flex bg-[#000] border border-[var(--color-border)] rounded-xl overflow-hidden focus-within:border-[var(--color-tungsten)] transition-colors mt-1 md:mt-2">
                                                <input type="text" value={cred.pass} readOnly className="bg-transparent px-3 md:px-4 py-2 md:py-3 flex-1 text-xs md:text-sm outline-none text-white font-mono" />
                                                <button
                                                    onClick={() => { navigator.clipboard.writeText(cred.pass); }}
                                                    className="px-3 md:px-4 py-2 md:py-3 hover:bg-[var(--color-tungsten)] hover:text-black transition-colors font-medium text-[10px] md:text-xs font-mono text-[var(--color-text-secondary)] border-l border-[var(--color-border)] cursor-pointer"
                                                >
                                                    {t('projects.copyBtn')}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
