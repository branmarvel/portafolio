import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function AboutSection() {
    const { t, language } = useLanguage();

    return (
        <section id="about" className="w-full h-full flex flex-col justify-start lg:justify-center items-center px-4 md:px-12 bg-[var(--color-base)] relative overflow-y-auto lg:overflow-hidden overflow-x-hidden no-scrollbar">
            {/* Subtle glow lines */}
            <div className="absolute top-1/4 -right-1/4 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent opacity-20 transform rotate-45 pointer-events-none"></div>

            <div className="max-w-7xl w-full flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-8 items-start lg:items-center pt-20 md:pt-24 lg:pt-0 pb-8 lg:pb-0">

                {/* Intro Bento Box */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 25 }}
                    className="lg:col-span-8 glass-panel rounded-2xl lg:rounded-[2.5rem] p-5 md:p-10 lg:p-14 relative overflow-hidden group flex flex-col justify-center pointer-events-auto hover:bg-[var(--color-surface-hover)] transition-colors w-full"
                >
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-tungsten)] opacity-[0.02] rounded-full blur-[80px] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none"></div>

                    <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tighter">{t('about.title')} <span className="text-[var(--color-tungsten)]">{t('about.highlight')}</span></h2>

                    <p className="text-xs md:text-xl lg:text-2xl font-light leading-relaxed mb-2 text-[var(--color-text-primary)] tracking-tight">
                        {t('about.p1')}
                    </p>
                    <p className="text-[11px] md:text-base lg:text-lg font-light leading-relaxed text-[var(--color-text-secondary)] mb-4 md:mb-6">
                        {t('about.p2')}
                    </p>

                    {/* CV Interactive Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                        <a
                            href={`/cv/modern?lang=${language}`}
                            className="px-4 py-2.5 md:px-8 md:py-4 rounded-full bg-[var(--color-tungsten)] text-black font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2 group/cv text-[11px] md:text-sm flex-1"
                        >
                            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/cv:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span>{t('about.modernCv')}</span>
                        </a>
                        <a
                            href={`/cv/classic?lang=${language}`}
                            className="px-4 py-2.5 md:px-8 md:py-4 rounded-full border border-[var(--color-border)] text-white font-semibold hover:bg-[var(--color-tungsten)] hover:text-black transition-colors flex items-center justify-center gap-2 group/cv text-[11px] md:text-sm flex-1"
                        >
                            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/cv:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
                            </svg>
                            <span>{t('about.classicCv')}</span>
                        </a>
                    </div>

                </motion.div>

                {/* Details Column */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 25 }}
                    className="lg:col-span-4 flex flex-row lg:flex-col gap-3 lg:gap-8 w-full"
                >
                    {/* Location */}
                    <div className="glass-panel rounded-2xl lg:rounded-[2.5rem] p-4 md:p-8 flex flex-col justify-center group hover:border-[var(--color-tungsten)] transition-colors pointer-events-auto hover:bg-[var(--color-surface-hover)] flex-1">
                        <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-tungsten)] mb-3 md:mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </div>
                        <h3 className="font-mono text-[9px] md:text-xs uppercase tracking-widest text-[var(--color-text-secondary)] mb-0.5">{t('about.locationTitle')}</h3>
                        <p className="text-sm md:text-2xl font-semibold tracking-tight leading-tight">{t('about.locationValue')}</p>
                    </div>

                    {/* Education */}
                    <div className="glass-panel rounded-2xl lg:rounded-[2.5rem] p-4 md:p-8 flex flex-col justify-center group hover:border-[var(--color-tungsten)] transition-colors pointer-events-auto hover:bg-[var(--color-surface-hover)] flex-1">
                        <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-tungsten)] mb-3 md:mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                        </div>
                        <h3 className="font-mono text-[9px] md:text-xs uppercase tracking-widest text-[var(--color-text-secondary)] mb-0.5">{t('about.eduTitle')}</h3>
                        <p className="text-sm md:text-xl xl:text-2xl font-semibold tracking-tight leading-snug">{t('about.eduDegree')}</p>
                        <p className="text-[9px] md:text-sm font-mono text-[var(--color-text-secondary)] mt-1">{t('about.eduPlace')}</p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
