import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Delay showing the banner for a smoother entrance
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'granted');
        setIsVisible(false);
        // Dispatch custom event for GA
        window.dispatchEvent(new Event('cookie-consent-granted'));
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:max-w-sm z-[100]"
                >
                    <div className="glass-panel p-6 rounded-2xl border border-[var(--color-border)] shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-tungsten)]/5 to-transparent pointer-events-none"></div>

                        <div className="relative z-10">
                            <h3 className="text-sm font-semibold mb-2 tracking-tight text-[var(--color-tungsten)] uppercase font-mono">Cookies & Analytics</h3>
                            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                Utilizo cookies para entender mejor cómo interactúas con mi portafolio y mejorar tu experiencia. ¿Permites el seguimiento anónimo?
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 py-2 px-4 bg-white text-black text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-[var(--color-tungsten)] transition-colors"
                                >
                                    Aceptar
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="flex-1 py-2 px-4 border border-[var(--color-border)] text-[var(--color-text-secondary)] text-[10px] font-bold uppercase tracking-wider rounded-lg hover:border-white hover:text-white transition-colors"
                                >
                                    Declinar
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
