import { motion, AnimatePresence } from 'framer-motion';
import { useScrollController } from '../hooks/useScrollController';

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
    const { currentIndex, direction, navigateTo } = useScrollController(sections);

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
                        className="w-1.5 md:w-2 relative h-6 md:h-12 flex justify-center group nav-dot"
                        aria-label={`Navigate to section ${idx + 1}`}
                    >
                        <div className={`w-0.5 transition-all duration-500 rounded-full ${currentIndex === idx ? 'h-full bg-[var(--color-tungsten)]' : 'h-1/3 bg-[var(--color-border)] group-hover:bg-white'
                            }`}></div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
