import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Magnetic from './Magnetic';

export default function Navbar() {
    const { language, toggleLanguage, t } = useLanguage();
    const [activeSection, setActiveSection] = useState('hero');

    // React to language changes
    const links = [
        { name: t('nav.home'), id: 'hero', index: 0 },
        { name: t('nav.skills'), id: 'skills', index: 1 },
        { name: t('nav.projects'), id: 'projects', index: 2 },
        { name: t('nav.about'), id: 'about', index: 3 },
        { name: t('nav.contact'), id: 'contact', index: 4 },
    ];

    useEffect(() => {
        // Use MutationObserver instead of setInterval for efficient DOM attribute watching
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.attributeName !== 'data-active-section') continue;

                const idx = document.body.getAttribute('data-active-section');
                if (idx === null) continue;

                const currentLink = links.find(l => l.index === parseInt(idx));
                if (currentLink) setActiveSection(currentLink.id);
            }
        });

        observer.observe(document.body, { attributes: true, attributeFilter: ['data-active-section'] });

        // Read initial value
        const idx = document.body.getAttribute('data-active-section');
        if (idx === null) return () => observer.disconnect();

        const currentLink = links.find(l => l.index === parseInt(idx));
        if (currentLink) setActiveSection(currentLink.id);

        return () => observer.disconnect();
    }, [links]);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-6 px-4 pointer-events-none"
        >
            <nav className="glass-panel pointer-events-auto px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center justify-between lg:justify-center gap-1 md:gap-6 border border-[var(--color-border)] shadow-lg shadow-black/20 w-full lg:w-auto max-w-sm mx-auto lg:max-w-none">

                {/* Enlaces de Navegación */}
                <div className="flex items-center gap-1 md:gap-4 overflow-x-auto no-scrollbar mask-edges pr-2 lg:pr-0">
                    {links.map((link) => (
                        <Magnetic key={link.id}>
                            <button
                                onClick={() => {
                                    const buttons = document.querySelectorAll('.nav-dot');
                                    if (buttons && buttons[link.index]) buttons[link.index].click();
                                }}
                                className={`relative px-2 py-1.5 md:px-3 text-[10px] md:text-sm font-medium uppercase tracking-widest transition-colors flex-shrink-0 ${activeSection === link.id ? 'text-[var(--color-tungsten)]' : 'text-[var(--color-text-secondary)] hover:text-white'
                                    }`}
                            >
                                {activeSection === link.id && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute inset-0 rounded-full bg-[var(--color-tungsten)]/10"
                                        transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                                    />
                                )}
                                <span className="relative z-10">{link.name}</span>
                            </button>
                        </Magnetic>
                    ))}
                </div>

                <div className="w-[1px] h-6 bg-[var(--color-border)] mx-1 md:mx-2 shrink-0 hidden lg:block" />

                {/* Toggle Language ES/EN */}
                <Magnetic>
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-1 md:gap-2 px-2 py-1.5 md:px-3 rounded-full hover:bg-[var(--color-surface-hover)] transition-colors border border-transparent hover:border-[var(--color-border)] group shrink-0"
                        title="Cambiar Idioma / Change Language"
                    >
                        <span className={`text-[10px] md:text-xs font-mono font-bold transition-colors ${language === 'es' ? 'text-[var(--color-tungsten)]' : 'text-[var(--color-text-secondary)]'}`}>ES</span>
                        <span className="text-[10px] md:text-xs text-[var(--color-border)]">/</span>
                        <span className={`text-[10px] md:text-xs font-mono font-bold transition-colors ${language === 'en' ? 'text-[var(--color-tungsten)]' : 'text-[var(--color-text-secondary)]'}`}>EN</span>
                    </button>
                </Magnetic>

            </nav>
        </motion.header>
    );
}
