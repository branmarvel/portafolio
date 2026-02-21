import { motion } from 'framer-motion';
import { useState } from 'react';
import { fadeInUp, staggerContainer } from '../utils/motion';
import { useLanguage } from '../context/LanguageContext';

export default function ContactSection() {
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);

        const form = e.target;

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus(null), 5000);
        }
    };

    return (
        <section id="contact" className="w-full h-full flex flex-col justify-start md:justify-center items-center px-4 md:px-12 relative overflow-y-auto overflow-x-hidden bg-[var(--color-base)]">

            {/* Minimalist Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="max-w-6xl w-full flex flex-col justify-start md:justify-center gap-4 lg:gap-12 pt-16 md:pt-0 pb-6 md:pb-0 relative z-10"
            >
                {/* Header */}
                <div className="text-center lg:text-left flex flex-col lg:flex-row justify-between items-start lg:items-end gap-2 md:gap-6 border-b border-[var(--color-border)] pb-3 md:pb-8 shrink-0">
                    <div>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-7xl font-bold tracking-tighter mb-1">{t('contact.title')} <span className="text-[var(--color-tungsten)]">{t('contact.highlight')}</span></motion.h2>
                        <motion.p variants={fadeInUp} className="text-[var(--color-text-secondary)] font-mono text-[9px] md:text-sm max-w-xl uppercase tracking-widest">
                            {t('contact.subtitle')}
                        </motion.p>
                    </div>
                    <div className="text-right hidden lg:block">
                        <p className="font-mono text-xs text-[var(--color-text-secondary)] uppercase tracking-widest">{t('contact.statusLabel')}</p>
                        <p className="text-sm font-semibold text-green-500 whitespace-nowrap"><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>{t('contact.statusValue')}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-24 shrink-0 pb-4">
                    {/* Contact Info */}
                    <motion.div variants={fadeInUp} className="flex flex-col gap-3 md:gap-6 justify-center glass-panel md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none border border-[var(--color-border)] md:border-none">
                        <a href="mailto:ing.bbellom@gmail.com" className="flex items-center gap-3 md:gap-6 group hover:translate-x-2 md:hover:translate-x-4 transition-transform duration-500 w-full overflow-hidden">
                            <div className="w-10 h-10 md:w-20 md:h-20 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:bg-[var(--color-tungsten)] group-hover:text-black transition-colors duration-500 shrink-0">
                                <svg className="w-4 h-4 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </div>
                            <div className="flex flex-col overflow-hidden min-w-0 flex-1">
                                <span className="font-mono text-[8px] md:text-xs uppercase text-[var(--color-text-secondary)] mb-0.5 tracking-widest truncate">{t('contact.emailLabel')}</span>
                                <span className="text-sm md:text-3xl font-medium group-hover:text-[var(--color-tungsten)] transition-colors truncate block">ing.bbellom@gmail.com</span>
                            </div>
                        </a>

                        <a href="https://api.whatsapp.com/send?phone=584123098258" target="_blank" rel="noreferrer" className="flex items-center gap-3 md:gap-6 group hover:translate-x-2 md:hover:translate-x-4 transition-transform duration-500 w-full overflow-hidden">
                            <div className="w-10 h-10 md:w-20 md:h-20 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:bg-[var(--color-tungsten)] group-hover:text-black transition-colors duration-500 shrink-0">
                                <svg className="w-4 h-4 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                            </div>
                            <div className="flex flex-col overflow-hidden min-w-0 flex-1">
                                <span className="font-mono text-[8px] md:text-xs uppercase text-[var(--color-text-secondary)] mb-0.5 tracking-widest truncate">{t('contact.whatsappLabel')}</span>
                                <span className="text-sm md:text-3xl font-medium group-hover:text-[var(--color-tungsten)] transition-colors truncate block">+58 (412) 3098258</span>
                            </div>
                        </a>

                        <a href="https://www.linkedin.com/in/brandon-jose-bello-moncada-5826061a0" target="_blank" rel="noreferrer" className="flex items-center gap-3 md:gap-6 group hover:translate-x-2 md:hover:translate-x-4 transition-transform duration-500 w-full overflow-hidden">
                            <div className="w-10 h-10 md:w-20 md:h-20 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:bg-[var(--color-tungsten)] group-hover:text-black transition-colors duration-500 shrink-0">
                                <svg className="w-4 h-4 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                            </div>
                            <div className="flex flex-col overflow-hidden min-w-0 flex-1">
                                <span className="font-mono text-[8px] md:text-xs uppercase text-[var(--color-text-secondary)] mb-0.5 tracking-widest truncate">{t('contact.linkedinLabel')}</span>
                                <span className="text-sm md:text-3xl font-medium group-hover:text-[var(--color-tungsten)] transition-colors truncate block">Brandon Bello</span>
                            </div>
                        </a>
                    </motion.div>

                    {/* Form */}
                    <motion.div variants={fadeInUp} className="flex flex-col justify-center glass-panel md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none border border-[var(--color-border)] md:border-none">
                        <form action="https://formspree.io/f/xnnpnnza" method="POST" onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6 relative z-10 w-full max-w-lg mx-auto xl:mx-0 xl:ml-auto">

                            <div className="relative group/input mt-1">
                                <label htmlFor="name" className={`absolute left-0 transition-all duration-300 font-mono text-[9px] md:text-xs tracking-widest uppercase pointer-events-none ${focusedInput === 'name' ? '-top-4 text-[var(--color-tungsten)]' : 'top-2.5 text-[var(--color-text-secondary)]'}`}>{t('contact.formName')}</label>
                                <input
                                    type="text" id="name" name="name" required
                                    onFocus={() => setFocusedInput('name')}
                                    onBlur={(e) => setFocusedInput(e.target.value ? 'name' : null)}
                                    className="w-full bg-transparent border-b-2 py-2.5 px-0 border-[var(--color-border)] focus:border-[var(--color-tungsten)] focus:outline-none transition-colors text-white font-medium text-sm"
                                />
                            </div>

                            <div className="relative mt-2 group/input">
                                <label htmlFor="email" className={`absolute left-0 transition-all duration-300 font-mono text-[9px] md:text-xs tracking-widest uppercase pointer-events-none ${focusedInput === 'email' ? '-top-4 text-[var(--color-tungsten)]' : 'top-2.5 text-[var(--color-text-secondary)]'}`}>{t('contact.formEmail')}</label>
                                <input
                                    type="email" id="email" name="email" required
                                    onFocus={() => setFocusedInput('email')}
                                    onBlur={(e) => setFocusedInput(e.target.value ? 'email' : null)}
                                    className="w-full bg-transparent border-b-2 py-2.5 px-0 border-[var(--color-border)] focus:border-[var(--color-tungsten)] focus:outline-none transition-colors text-white font-medium text-sm"
                                />
                            </div>

                            <div className="relative mt-2 group/input">
                                <label htmlFor="message" className={`absolute left-0 transition-all duration-300 font-mono text-[9px] md:text-xs tracking-widest uppercase pointer-events-none ${focusedInput === 'message' ? '-top-4 text-[var(--color-tungsten)]' : 'top-2.5 text-[var(--color-text-secondary)]'}`}>{t('contact.formMessage')}</label>
                                <textarea
                                    id="message" name="message" rows="2" required
                                    onFocus={() => setFocusedInput('message')}
                                    onBlur={(e) => setFocusedInput(e.target.value ? 'message' : null)}
                                    className="w-full bg-transparent border-b-2 py-2.5 px-0 border-[var(--color-border)] focus:border-[var(--color-tungsten)] focus:outline-none transition-colors text-white resize-none font-medium text-sm"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-2 md:mt-6 w-full py-3 md:py-5 px-6 bg-white text-black font-bold uppercase tracking-widest text-[10px] md:text-sm hover:bg-[var(--color-tungsten)] transition-colors disabled:opacity-50 flex items-center justify-between group overflow-hidden relative rounded-full"
                            >
                                <span className="relative z-10">{isSubmitting ? t('contact.formDoing') : t('contact.formSubmit')}</span>
                                {!isSubmitting && (
                                    <svg className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                )}
                            </button>

                            {status === 'success' && <p className="text-green-500 font-mono text-[10px] mt-1 border border-green-500/30 bg-green-500/10 p-2 rounded">{t('contact.formSuccess')}</p>}
                            {status === 'error' && <p className="text-red-500 font-mono text-[10px] mt-1 border border-red-500/30 bg-red-500/10 p-2 rounded">{t('contact.formError')}</p>}
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
