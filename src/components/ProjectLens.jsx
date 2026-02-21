import { motion } from 'framer-motion';
import { mechanicalSpring } from '../utils/motion';

export default function ProjectLens({ project, isActive, onClick, index }) {
    return (
        <motion.button
            layout
            onClick={onClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...mechanicalSpring, delay: index * 0.1 }}
            className={`relative flex items-center group text-left ${isActive ? 'z-50' : 'z-10'}`}
        >
            {/* Connector line */}
            <motion.div
                layout
                className="h-px bg-[var(--color-border)] mr-6 group-hover:bg-[var(--color-tungsten)] transition-colors duration-500"
                animate={{ width: isActive ? 120 : 40 }}
                transition={mechanicalSpring}
            />

            <motion.div
                layout
                className={`px-6 py-4 border border-[var(--color-border)] backdrop-blur-md overflow-hidden
          ${isActive ? 'bg-[var(--color-surface)] shadow-[0_0_40px_rgba(255,215,170,0.05)]' : 'bg-transparent group-hover:bg-[rgba(20,20,20,0.5)]'}
          transition-colors duration-500`}
                animate={{
                    width: isActive ? 400 : 250,
                    height: isActive ? 200 : 64
                }}
                transition={mechanicalSpring}
            >
                <motion.div layout className="flex flex-col h-full justify-center">
                    <motion.span
                        layout="position"
                        className={`font-mono text-xs uppercase tracking-widest ${isActive ? 'text-[var(--color-tungsten)]' : 'text-[var(--color-text-secondary)]'}`}
                    >
                        {project.role}
                    </motion.span>
                    <motion.h3
                        layout="position"
                        className={`font-medium tracking-tight mt-1 ${isActive ? 'text-xl' : 'text-base'}`}
                    >
                        {project.title}
                    </motion.h3>

                    {/* Expanded Content */}
                    {isActive && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, ...mechanicalSpring }}
                            className="mt-auto pt-4 border-t border-[var(--color-border)]"
                        >
                            <p className="text-sm text-[var(--color-text-secondary)]">
                                {project.desc}
                            </p>
                            <div className="mt-4 flex gap-4 font-mono text-xs text-[var(--color-tungsten)]">
                                {project.demoUrl && (
                                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="cursor-pointer hover:underline">VER DEMO</a>
                                )}
                                {project.videoUrl && (
                                    <a href={project.videoUrl} target="_blank" rel="noreferrer" className="cursor-pointer hover:underline">VER VIDEO</a>
                                )}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </motion.button>
    );
}
