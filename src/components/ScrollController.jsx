import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Variantes maestras de transición entre pantallas
const pageVariants = {
    initial: (direction) => ({
        y: direction > 0 ? "100%" : "-100%",
        opacity: 0.5,
        filter: "blur(10px)",
        scale: 0.95
    }),
    animate: {
        y: "0%",
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        transition: {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1] // Apple-like custom easing
        }
    },
    exit: (direction) => ({
        y: direction < 0 ? "100%" : "-100%",
        opacity: 0,
        filter: "blur(4px)",
        scale: 0.90,
        transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1]
        }
    })
};

export default function ScrollController({ sections }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const isAnimating = useRef(false);

    const navigateTo = useCallback((newIndex, newDirection) => {
        if (isAnimating.current || newIndex === currentIndex) return;
        if (newIndex < 0 || newIndex >= sections.length) return;
        isAnimating.current = true;
        setDirection(newDirection);
        setCurrentIndex(newIndex);
        setTimeout(() => { isAnimating.current = false; }, 1400);
    }, [currentIndex, sections.length]);

    useEffect(() => {
        // Wheel handler at window level with capture phase to ensure it fires
        // BEFORE any stopPropagation in child components
        const handleWheel = (e) => {
            if (isAnimating.current) return;
            if (Math.abs(e.deltaY) < 30) return;

            const newDirection = e.deltaY > 0 ? 1 : -1;
            const newIndex = currentIndex + newDirection;

            if (newIndex >= 0 && newIndex < sections.length) {
                isAnimating.current = true;
                setDirection(newDirection);
                setCurrentIndex(newIndex);
                setTimeout(() => { isAnimating.current = false; }, 1400);
            }
        };

        // Soporte Toque para Móviles
        let touchStart = 0;
        let touchStartX = 0;
        const handleTouchStart = (e) => {
            touchStart = e.changedTouches[0].screenY;
            touchStartX = e.changedTouches[0].screenX;
        };

        const handleTouchEnd = (e) => {
            if (isAnimating.current) return;
            const touchEnd = e.changedTouches[0].screenY;
            const touchEndX = e.changedTouches[0].screenX;
            const deltaY = touchStart - touchEnd;
            const deltaX = touchStartX - touchEndX;

            // Only trigger vertical navigation if vertical swipe is dominant
            if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
                const newDirection = deltaY > 0 ? 1 : -1;
                const newIndex = currentIndex + newDirection;
                if (newIndex >= 0 && newIndex < sections.length) {
                    isAnimating.current = true;
                    setDirection(newDirection);
                    setCurrentIndex(newIndex);
                    setTimeout(() => isAnimating.current = false, 1400);
                }
            }
        };

        // Use capture: true to intercept wheel events BEFORE children can stopPropagation
        window.addEventListener('wheel', handleWheel, { capture: true, passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        document.body.setAttribute('data-active-section', currentIndex);

        return () => {
            window.removeEventListener('wheel', handleWheel, { capture: true });
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [currentIndex, sections.length]);

    const CurrentSection = sections[currentIndex].component;

    return (
        <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-[var(--color-base)]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-auto"
                >
                    <CurrentSection />
                </motion.div>
            </AnimatePresence>

            {/* Sidebar Indicador de Progreso Dinámico — visible en todas las resoluciones */}
            <div className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 md:gap-3 z-50">
                {sections.map((_, idx) => (
                    <motion.button
                        key={idx}
                        onClick={() => navigateTo(idx, idx > currentIndex ? 1 : -1)}
                        className="w-1.5 md:w-2 relative h-6 md:h-12 flex justify-center group"
                    >
                        <div className={`w-0.5 transition-all duration-500 rounded-full ${currentIndex === idx ? 'h-full bg-[var(--color-tungsten)]' : 'h-1/3 bg-[var(--color-border)] group-hover:bg-white'
                            }`}></div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
