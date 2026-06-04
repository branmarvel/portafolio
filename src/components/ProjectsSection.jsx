import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { mechanicalSpring } from '../utils/motion';
import { useLanguage } from '../context/LanguageContext';
import Magnetic from './Magnetic';

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

    const categoryConfig = {
        university: {
            color: '#a78bda',
            label: t('projects.catUniversity'),
            icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5"/></svg>
        },
        government: {
            color: '#6b8aae',
            label: t('projects.catGovernment'),
            icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
        },
        freelance: {
            color: '#5ea88e',
            label: t('projects.catFreelance'),
            icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
        },
        personal: {
            color: '#ffd7aa',
            label: t('projects.catPersonal'),
            icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
        }
    };

    const projects = [
        {
            id: 'jutba',
            title: t('projects.jutbaTitle'),
            role: t('projects.jutbaRole'),
            category: 'freelance',
            tags: ['Flutter', 'Firebase', 'NestJS', 'TypeScript', 'Cloud Run'],
            description: t('projects.jutbaDesc'),
            videoUrl: 'https://www.youtube.com/embed/I87DAt4ZdD4?autoplay=0&controls=1&mute=1',
            demoUrl: null,
            credentials: null,
            architecture: [
                '┌─────────────────────────────────────────────┐',
                '│              JUTBA STREAMING PLATFORM       │',
                '├─────────────────────────────────────────────┤',
                '│                                             │',
                '│  ┌─────────┐   REST    ┌──────────────┐    │',
                '│  │ Flutter │◄─────────►│ NestJS API   │    │',
                '│  │ iOS/And │   WS      │ TypeScript   │    │',
                '│  │ Web App │           │ Cloud Run    │    │',
                '│  └─────────┘           └──────┬───────┘    │',
                '│                               │            │',
                '│  ┌─────────┐          ┌───────┼───────┐    │',
                '│  │ Redis   │◄────────►│ PostgreSQL    │    │',
                '│  │ Cache   │          │ (TypeORM)     │    │',
                '│  └─────────┘          └───────┬───────┘    │',
                '│                               │            │',
                '│  ┌────────────────────────────┴───────┐    │',
                '│  │ External Integrations              │    │',
                '│  ├────────────────────────────────────┤    │',
                '│  │ • Firebase Admin (Push/Auth)       │    │',
                '│  │ • Stripe (Payments) & Twilio (SMS) │    │',
                '│  │ • GCP Text-to-Speech & VertexAI    │    │',
                '│  └────────────────────────────────────┘    │',
                '└─────────────────────────────────────────────┘',
            ]
        },
        {
            id: 'sgcp',
            title: t('projects.sgcpTitle'),
            role: t('projects.sgcpRole'),
            category: 'government',
            tags: ['Go (Golang)', 'PostgreSQL', 'JWT/RBAC', 'Astro', 'React Native'],
            description: t('projects.sgcpDesc'),
            videoUrl: null, // Private (NDA)
            demoUrl: null,
            credentials: null,
            architecture: [
                '┌─────────────────────────────────────────────┐',
                '│           PUBLIC ASSET SYSTEM (SGCP)        │',
                '├─────────────────────────────────────────────┤',
                '│                                             │',
                '│  ┌─────────┐   REST    ┌──────────────┐    │',
                '│  │ Astro 5 │◄────────►│  Go 1.25 API  │    │',
                '│  │React 19 │  + WS    │  Gin + GORM   │    │',
                '│  │ECharts  │          │  JWT / RBAC   │    │',
                '│  └─────────┘          └──────┬───────┘    │',
                '│                               │            │',
                '│  ┌─────────┐          ┌──────┴───────┐    │',
                '│  │  Expo   │◄────────►│  PostgreSQL   │    │',
                '│  │SDK 54   │  REST    │  +100k rows   │    │',
                '│  │OCR+Bio  │          └──────────────┘    │',
                '│  └─────────┘                               │',
                '│                               │            │',
                '│  ┌─────────┐          ┌──────┴───────┐    │',
                '│  │  n8n    │─────────►│   Telegram    │    │',
                '│  │Workflow │  Alerts  │   Bot API     │    │',
                '│  └─────────┘          └──────────────┘    │',
                '│                                             │',
                '│  Infra: Docker │ Linux │ CI/CD Pipeline     │',
                '└─────────────────────────────────────────────┘',
            ]
        },
        {
            id: 'football',
            title: t('projects.footballTitle'),
            role: t('projects.footballRole'),
            category: 'personal',
            tags: ['Flutter', 'Cubit', 'TypeScript', 'Clean Architecture', 'Mobile UI'],
            description: t('projects.footballDesc'),
            videoUrl: 'https://www.youtube.com/embed/MVS1Gzqt5Ms?autoplay=0&controls=1&mute=1',
            demoUrl: null,
            githubUrl: 'https://github.com/branmarvel/profile-CeleBreak-task',
            credentials: null,
            architecture: [
                '┌─────────────────────────────────────────────┐',
                '│         FOOTBALLER PROFILE & MATCH HUB      │',
                '├─────────────────────────────────────────────┤',
                '│                                             │',
                '│  ┌─────────┐   Cubit   ┌──────────────┐    │',
                '│  │  UI     │◄─────────►│ ProfileCubit │    │',
                '│  │ Widgets │  States   └──────┬───────┘    │',
                '│  └─────────┘                  │            │',
                '│                               ▼            │',
                '│                        ┌──────────────┐    │',
                '│                        │ GetProfile   │    │',
                '│                        │ (Usecase)    │    │',
                '│                        └──────┬───────┘    │',
                '│                               ▼            │',
                '│                        ┌──────────────┐    │',
                '│                        │ ProfileRepo  │    │',
                '│                        └──────┬───────┘    │',
                '│                               ▼            │',
                '│                        ┌──────────────┐    │',
                '│                        │ RemoteSource │    │',
                '│                        │ (Mock API)   │    │',
                '│                        └──────────────┘    │',
                '└─────────────────────────────────────────────┘',
            ]
        },
        {
            id: 'erp',
            title: t('projects.erpTitle'),
            role: t('projects.erpRole'),
            category: 'government',
            tags: ['Laravel 11', 'Vue 3', 'Node.js', 'Socket.io', 'Docker'],
            description: t('projects.erpDesc'),
            videoUrl: null, // Excluded per user request
            demoUrl: null,
            credentials: null,
            architecture: [
                '┌─────────────────────────────────────────────┐',
                '│        WAREHOUSE & INVENTORY SYSTEM         │',
                '├─────────────────────────────────────────────┤',
                '│                                             │',
                '│  ┌─────────┐  Axios   ┌──────────────┐    │',
                '│  │ Vue 3   │◄────────►│ Laravel 11   │    │',
                '│  │PrimeVue │          │  PHP 8.2     │    │',
                '│  │ Vite    │          │  REST API    │    │',
                '│  └─────────┘          └──────┬───────┘    │',
                '│       │                       │            │',
                '│  ┌────┴────┐          ┌──────┴───────┐    │',
                '│  │Socket.io│ Realtime │  PostgreSQL   │    │',
                '│  │  Events │◄────────►│  + Auditing   │    │',
                '│  └─────────┘          └──────────────┘    │',
                '│                               │            │',
                '│  ┌─────────┐          ┌──────┴───────┐    │',
                '│  │  n8n    │─────────►│   Telegram    │    │',
                '│  │Workflow │  Alerts  │   Bot API     │    │',
                '│  └─────────┘          └──────────────┘    │',
                '│                                             │',
                '│  Infra: Docker │ Linux │ PDF Engine         │',
                '└─────────────────────────────────────────────┘',
            ]
        },
        {
            id: 'calc',
            title: t('projects.calcTitle'),
            role: t('projects.calcRole'),
            category: 'personal',
            tags: ['React Native', 'Expo', 'TypeScript', 'Tailwind CSS', 'Mobile UI'],
            description: t('projects.calcDesc'),
            videoUrl: 'https://www.youtube.com/embed/pVpo8PMqKq0?autoplay=0&controls=1&mute=1',
            demoUrl: null,
            githubUrl: 'https://github.com/branmarvel/VesTrack',
            credentials: null
        },
        {
            id: 'movi',
            title: t('projects.moviTitle'),
            role: t('projects.moviRole'),
            category: 'personal',
            tags: ['React Native', 'Expo', 'TypeScript', 'Android', 'iOS'],
            description: t('projects.moviDesc'),
            videoUrl: 'https://www.youtube.com/embed/CRh3BbnVRaM?autoplay=0&controls=1&mute=1',
            demoUrl: null,
            githubUrl: 'https://github.com/branmarvel/movilnet-app',
            credentials: null
        },
        {
            id: 'sgcp-legacy',
            title: t('projects.sgcpLegacyTitle'),
            role: t('projects.sgcpLegacyRole'),
            category: 'university',
            tags: ['Angular', 'Firebase', 'Bootstrap', 'JavaScript'],
            description: t('projects.sgcpLegacyDesc'),
            videoUrl: 'https://www.youtube.com/embed/1_30YCtLpRo?autoplay=0&controls=1&mute=1',
            demoUrl: 'https://sgcp-app.web.app/#/login',
            githubUrl: 'https://github.com/branmarvel/Sistema-para-la-Gestion-y-Control-de-proyectos',
            credentials: [
                { label: t('projects.sgcpCredUser'), value: 'admin@admin.com' },
                { label: t('projects.sgcpCredPass'), value: '123456' }
            ],
            architecture: [
                '┌─────────────────────────────────────────────┐',
                '│      PROJECT MANAGEMENT SYSTEM (LEGACY)     │',
                '├─────────────────────────────────────────────┤',
                '│                                             │',
                '│  ┌─────────┐   REST/WS ┌──────────────┐    │',
                '│  │ Angular │◄─────────►│  Firebase    │    │',
                '│  │ Web App │           │  Firestore   │    │',
                '│  │ SPA     │           │  Auth/Rules  │    │',
                '│  └─────────┘           └──────┬───────┘    │',
                '│                               │            │',
                '│                        ┌──────┴───────┐    │',
                '│                        │   Cloud      │    │',
                '│                        │   Functions  │    │',
                '│                        └──────────────┘    │',
                '└─────────────────────────────────────────────┘',
            ]
        },
        {
            id: 'utext',
            title: t('projects.utextTitle'),
            role: t('projects.utextRole'),
            category: 'university',
            tags: ['Flutter', 'Firebase', 'Dart', 'Mobile UI'],
            description: t('projects.utextDesc'),
            videoUrl: 'https://www.youtube.com/embed/_rpIpp9s7Zo?autoplay=0&controls=1&mute=1',
            demoUrl: 'https://u-text-app.web.app',
            githubUrl: 'https://github.com/branmarvel/U-text',
            credentials: [
                { label: t('projects.utextCredTeacher'), value: 'admin@admin.com', pass: '123456' },
                { label: t('projects.utextCredStudent'), value: 'student@student.com', pass: '123456' }
            ],
            architecture: [
                '┌─────────────────────────────────────────────┐',
                '│           IBC APRENDEIT PLATFORM            │',
                '├─────────────────────────────────────────────┤',
                '│                                             │',
                '│  ┌─────────┐   REST/WS ┌──────────────┐    │',
                '│  │ Flutter │◄─────────►│  Firebase    │    │',
                '│  │ Mobile  │           │  Firestore   │    │',
                '│  │ App     │           │  Auth/Storage│    │',
                '│  └────┬────┘           └──────┬───────┘    │',
                '│       │                       │            │',
                '│       │ REST           ┌──────┴───────┐    │',
                '│       ├───────────────►│   Cloud      │    │',
                '│       │                │   Functions  │    │',
                '│       ▼                └──────────────┘    │',
                '│  ┌─────────┐                               │',
                '│  │ OpenAI  │                               │',
                '│  │ ChatGPT │                               │',
                '│  └─────────┘                               │',
                '└─────────────────────────────────────────────┘',
            ]
        }
    ];

    const projectIndex = Math.abs(page % projects.length);
    const project = projects[projectIndex];

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <section id="projects" className="w-full h-full flex flex-col items-center justify-start lg:justify-center px-4 md:px-12 relative overflow-y-auto lg:overflow-hidden overflow-x-hidden bg-[var(--color-base)] no-scrollbar">

            {/* Header Overlay - Absolute */}
            <div className="w-full max-w-7xl pt-20 md:pt-24 lg:pt-0 lg:absolute lg:top-24 lg:left-12 z-20 shrink-0 px-0 lg:px-0">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 tracking-tighter"
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

            {/* Navigation Buttons for Desktop — only visible when 2-column layout is active (lg+) */}
            <div className="absolute top-1/2 -translate-y-1/2 right-6 lg:right-12 xl:right-24 z-20 flex-col gap-4 hidden lg:flex pointer-events-auto">
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
            <div className="w-full max-w-7xl lg:min-h-[65vh] lg:h-[65vh] mt-4 lg:mt-24 pb-20 lg:pb-0 relative perspective-1000 shrink-0">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="relative lg:absolute lg:inset-0 w-full flex flex-col lg:flex-row gap-4 lg:gap-16 items-center lg:items-center"
                    >
                        {/* Video / Preview Card Side */}
                        <div className="w-full lg:w-[55%] aspect-video lg:aspect-auto lg:h-full rounded-2xl md:rounded-3xl overflow-hidden glass-panel p-3 md:p-6 shadow-2xl relative group shrink-0 pointer-events-auto flex flex-col justify-between bg-black/40 border border-white/5">
                            {/* Mac Window Header Controls */}
                            <div className="flex items-center gap-1.5 mb-2 md:mb-4 border-b border-white/5 pb-2 md:pb-3">
                                <span className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-[#ff5f56] opacity-80" />
                                <span className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-[#ffbd2e] opacity-80" />
                                <span className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-[#27c93f] opacity-80" />
                                <span className="text-[9px] md:text-[10px] font-mono text-[var(--color-text-secondary)] ml-2 md:ml-3 tracking-widest">{project.id.toUpperCase()} // DASHBOARD_PREVIEW.sh</span>
                            </div>
                            
                            {project.videoUrl ? (
                                <div className="flex-1 rounded-xl overflow-hidden relative bg-black border border-white/5">
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
                            ) : (
                                /* Graphic Central Visualization for NDA or Mobile Expo mockups */
                                <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden rounded-xl bg-black/50 border border-white/5 p-2 md:p-4">
                                    <div className="absolute -inset-10 bg-radial-gradient from-[var(--color-tungsten)]/10 to-transparent/0 opacity-30 blur-2xl group-hover:scale-125 transition-transform duration-1000" />
                                    
                                    <motion.div 
                                        animate={{ y: [0, -4, 0] }}
                                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                        className="z-10 flex flex-col items-center text-center gap-1.5 md:gap-2"
                                    >
                                        <div className="w-12 h-12 md:w-20 md:h-20 mb-1 md:mb-2 text-[var(--color-tungsten)] opacity-80 flex items-center justify-center">
                                            {project.category === 'personal' || project.category === 'freelance' ? (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-[0_0_12px_rgba(255,215,170,0.3)]">
                                                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                                                    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2"></line>
                                                </svg>
                                            ) : (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-[0_0_12px_rgba(255,215,170,0.3)]">
                                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                                    <line x1="8" y1="21" x2="16" y2="21"></line>
                                                    <line x1="12" y1="17" x2="12" y2="21"></line>
                                                </svg>
                                            )}
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
                            )}
                            
                            {/* Terminal Prompt Footer */}
                            <div className="mt-2 md:mt-4 pt-2 md:pt-3 border-t border-white/5 font-mono text-[10px] md:text-xs text-[var(--color-text-secondary)] flex justify-between items-center w-full">
                                <span>STATUS: <span className={project.videoUrl ? "text-[#27c93f] font-semibold" : (project.id === 'calc' || project.id === 'movi' || project.id === 'jutba') ? "text-amber-400 font-semibold" : "text-[#ff5f56] font-semibold"}>{project.videoUrl ? "ACTIVE_STAGING" : (project.id === 'calc' || project.id === 'movi') ? "OFFLINE_LOCAL_DEV" : project.id === 'jutba' ? "PUBLIC_RELEASE_PENDING" : "SECURE_PRODUCTION"}</span></span>
                                <span>NETWORK: {project.videoUrl ? "PUBLIC_CLOUDFLARE" : (project.id === 'calc' || project.id === 'movi') ? "EXPO_CLIENT_SIM" : project.id === 'jutba' ? "PUBLIC_CLOUDFLARE" : "PRIVATE_MINISTRY"}</span>
                            </div>
                        </div>

                        {/* Text & Details Side */}
                        <div className="w-full lg:w-[45%] flex flex-col justify-center h-full gap-2 lg:gap-6 mt-2 lg:mt-0 pointer-events-auto">
                            <div>
                                <span className="font-mono text-[var(--color-tungsten)] tracking-widest text-[10px] md:text-xs uppercase block mb-0.5 lg:mb-2">
                                    {project.role}
                                </span>
                                {/* Category Badge */}
                                <span
                                    className="inline-flex items-center gap-1.5 font-mono text-[9px] md:text-[11px] tracking-widest uppercase mb-2 lg:mb-3 py-1 px-2.5 rounded-sm"
                                    style={{
                                        color: categoryConfig[project.category]?.color,
                                        borderLeft: `2px solid ${categoryConfig[project.category]?.color}`,
                                        backgroundColor: `${categoryConfig[project.category]?.color}11`
                                    }}
                                >
                                    {categoryConfig[project.category]?.icon}
                                    {categoryConfig[project.category]?.label}
                                </span>
                                <h3 className="text-lg md:text-2xl lg:text-5xl font-bold tracking-tight leading-none mb-1 lg:mb-4">{project.title}</h3>
                            </div>

                            <div className="max-w-md pointer-events-auto">
                                {project.description && project.description.includes('•') ? (
                                    <ul className="space-y-1.5 list-none">
                                        {project.description.split('•').map(p => p.trim()).filter(Boolean).map((part, index) => (
                                            <li key={index} className="flex items-start gap-2.5 text-[var(--color-text-secondary)] leading-relaxed text-[11px] md:text-xs lg:text-sm">
                                                <span className="text-[var(--color-tungsten)] mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-tungsten)] opacity-70" />
                                                <span>{part}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed text-[11px] md:text-xs lg:text-sm">
                                        {project.description}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-1.5 lg:gap-2 mt-1 lg:mt-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-[#151515] border border-[var(--color-border)] rounded-full text-[10px] lg:text-xs font-mono text-white/80">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-2 lg:gap-3 mt-3 lg:mt-6">
                                {project.demoUrl && (
                                    <Magnetic>
                                        <a href={project.demoUrl} target="_blank" rel="noreferrer" className="px-4 py-2 lg:px-6 lg:py-3 rounded-full bg-white text-black font-semibold text-xs lg:text-sm hover:scale-105 transition-transform flex items-center gap-2 block">
                                            {t('projects.demoBtn')}
                                            <svg className="w-3 h-3 lg:w-4 lg:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                        </a>
                                    </Magnetic>
                                )}
                                {project.githubUrl && (
                                    <Magnetic>
                                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="px-4 py-2 lg:px-6 lg:py-3 rounded-full border border-[var(--color-border)] text-white font-medium text-xs lg:text-sm hover:bg-white hover:text-black transition-colors flex items-center gap-2 block">
                                            {t('projects.repoBtn')}
                                            <svg className="w-3.5 h-3.5 fill-current ml-1" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                        </a>
                                    </Magnetic>
                                )}
                                {project.credentials && (
                                    <Magnetic>
                                        <button
                                            onClick={() => setActiveModal({ id: project.id, type: 'credentials' })}
                                            className="px-4 py-2 lg:px-6 lg:py-3 rounded-full border border-[var(--color-border)] text-xs lg:text-sm font-medium hover:bg-[var(--color-tungsten)] hover:text-black transition-colors"
                                        >
                                            {t('projects.credBtn')}
                                        </button>
                                    </Magnetic>
                                )}
                                {project.architecture && (
                                    <Magnetic>
                                        <button
                                            onClick={() => setActiveModal({ id: project.id, type: 'architecture' })}
                                            className="px-4 py-2 lg:px-6 lg:py-3 rounded-full border border-[var(--color-border)] text-xs lg:text-sm font-medium hover:bg-[var(--color-tungsten)] hover:text-black transition-colors"
                                        >
                                            {t('projects.archBtn')}
                                        </button>
                                    </Magnetic>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Mobile Controls — only visible below lg breakpoint (when no desktop arrows) */}
            <div className="sticky bottom-4 left-0 right-0 flex items-center justify-center gap-4 lg:hidden z-20 pointer-events-auto shrink-0 pb-2">
                <button onClick={() => paginate(-1)} className="p-2.5 bg-[var(--color-surface)] rounded-full border border-[var(--color-border)] text-white hover:bg-[var(--color-surface-hover)] active:scale-95 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>

                {/* Dots Indicator for Mobile */}
                <div className="flex gap-1.5">
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

                <button onClick={() => paginate(1)} className="p-2.5 bg-[var(--color-surface)] rounded-full border border-[var(--color-border)] text-white hover:bg-[var(--color-surface-hover)] active:scale-95 transition-transform">
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

                            <h3 className="text-xl md:text-2xl font-bold mb-6">
                                {activeModal.type === 'architecture' ? t('projects.modalTitleArch') : t('projects.modalTitleCred')}{' '}
                                <span className="text-[var(--color-tungsten)]">
                                    {activeModal.type === 'architecture' ? t('projects.modalHighlightArch') : t('projects.modalHighlightCred')}
                                </span>
                            </h3>

                            <div className="flex flex-col gap-4 md:gap-6">
                                {activeModal.type === 'architecture' ? (
                                    <div className="w-full overflow-x-auto bg-[#0a0a0a] border border-[var(--color-border)] rounded-xl p-3 md:p-4 hide-scrollbar">
                                        <pre className="text-[8px] md:text-[10px] font-mono text-[var(--color-tungsten)] leading-tight whitespace-pre">
                                            {projects.find(p => p.id === activeModal.id)?.architecture?.join('\n')}
                                        </pre>
                                    </div>
                                ) : (
                                    projects.find(p => p.id === activeModal.id)?.credentials?.map((cred, i) => (
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
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
