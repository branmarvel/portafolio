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
            tags: ['Angular', 'Firebase', 'Realtime DB'],
            description: t('projects.sgcpDesc'),
            videoUrl: 'https://www.youtube.com/embed/1_30YCtLpRo?autoplay=0&controls=1&mute=1',
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
            tags: ['Flutter', 'Firebase', 'Dart'],
            description: t('projects.utextDesc'),
            videoUrl: 'https://www.youtube.com/embed/_rpIpp9s7Zo?autoplay=0&controls=1&mute=1',
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
            tags: ['Laravel', 'Vue.js', 'PostgreSQL'],
            description: t('projects.erpDesc'),
            videoUrl: 'https://www.youtube.com/embed/gsz2Cx-1DYw?autoplay=0&controls=1&mute=1',
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
                        <div key={idx} className={`h-1 transition-all duration-500 rounded ${idx === projectIndex ? 'w-8 bg-[var(--color-tungsten)]' : 'w-2 bg-[var(--color-border)]'}`} />
                    ))}
                </div>
            </div>

            {/* Navigation Buttons for Desktop */}
            <div className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 xl:right-24 z-20 flex-col gap-4 hidden md:flex pointer-events-auto">
                <button
                    onClick={() => paginate(-1)}
                    className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-tungsten)] hover:border-transparent hover:text-black transition-all group shrink-0"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button
                    onClick={() => paginate(1)}
                    className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-tungsten)] hover:border-transparent hover:text-black transition-all group shrink-0"
                >
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>

            {/* Viewport for Sliders */}
            <div className="w-full max-w-7xl h-[65dvh] lg:h-[65vh] mt-24 relative perspective-1000">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 flex flex-col lg:flex-row gap-4 lg:gap-16 items-center"
                    >
                        {/* Video Side */}
                        <div className="w-full lg:w-[55%] h-48 sm:h-64 lg:h-full rounded-2xl md:rounded-3xl overflow-hidden glass-panel p-2 shadow-2xl relative group shrink-0 pointer-events-auto">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-tungsten)]/10 to-transparent/0 pointer-events-none group-hover:opacity-100 opacity-20 transition-opacity duration-700"></div>
                            <div className="w-full h-full rounded-xl overflow-hidden relative bg-black">
                                <iframe
                                    className="w-full h-full absolute inset-0 pointer-events-auto"
                                    src={project.videoUrl}
                                    title={project.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
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
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 md:hidden z-20 pointer-events-auto">
                <button onClick={() => paginate(-1)} className="p-3 bg-[var(--color-surface)] rounded-full border border-[var(--color-border)] text-white hover:bg-[var(--color-surface-hover)]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
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
