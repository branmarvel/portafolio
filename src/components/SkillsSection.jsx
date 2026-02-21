import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const skillCategories = [
    {
        icon: '💻',
        skills: [
            { name: 'HTML5', icon: 'https://img.icons8.com/color/48/html-5.png' },
            { name: 'CSS3', icon: 'https://img.icons8.com/color/48/css3.png' },
            { name: 'JavaScript', icon: 'https://img.icons8.com/color/48/javascript.png' },
            { name: 'Angular', icon: 'https://img.icons8.com/color/48/angularjs.png' },
            { name: 'Vue.js', icon: 'https://img.icons8.com/color/48/vue-js.png' },
            { name: 'React', icon: 'https://img.icons8.com/color/48/react-native.png' }
        ]
    },
    {
        icon: '⚙️',
        skills: [
            { name: 'Node.js', icon: 'https://img.icons8.com/color/48/nodejs.png' },
            { name: 'PHP', icon: 'https://img.icons8.com/color/48/php.png' },
            { name: 'Laravel', icon: 'https://img.icons8.com/fluency/48/laravel.png' },
            { name: 'PostgreSQL', icon: 'https://img.icons8.com/color/48/postgreesql.png' },
            { name: 'MySQL', icon: 'https://img.icons8.com/color/48/mysql.png' },
            { name: 'MongoDB', icon: 'https://img.icons8.com/color/48/mongodb.png' }
        ]
    },
    {
        icon: '☁️',
        skills: [
            { name: 'Flutter', icon: 'https://img.icons8.com/color/48/flutter.png' },
            { name: 'Firebase', icon: 'https://img.icons8.com/color/48/firebase.png' },
            { name: 'AWS', icon: 'https://img.icons8.com/color/48/amazon-web-services.png' },
            { name: 'Docker', icon: 'https://img.icons8.com/color/48/docker.png' },
            { name: 'Git', icon: 'https://img.icons8.com/color/48/git.png' }
        ]
    }
];

const fadeInUpItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const staggerContainer = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function SkillsSection() {
    const { t } = useLanguage();

    const translatedCategories = [
        { ...skillCategories[0], title: t('skills.catFrontend') },
        { ...skillCategories[1], title: t('skills.catBackend') },
        { ...skillCategories[2], title: t('skills.catMobileCloud') }
    ];

    return (
        <section id="skills" className="w-full min-h-full flex flex-col justify-center items-center px-4 md:px-12 bg-[var(--color-base)] relative overflow-hidden">
            {/* Ambient Background Blur */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-tungsten)]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl w-full flex flex-col h-full justify-center pt-24 pb-12 overflow-y-auto md:overflow-visible no-scrollbar">

                <div className="mb-6 md:mb-16 text-center lg:text-left shrink-0">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 tracking-tighter"
                    >
                        {t('skills.title')} <span className="text-[var(--color-tungsten)]">{t('skills.highlight')}</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-[var(--color-text-secondary)] font-mono text-[9px] md:text-sm max-w-xl mx-auto lg:mx-0 uppercase tracking-widest break-words px-2"
                    >
                        {t('skills.subtitle')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 lg:gap-8 pb-4 shrink-0 pr-2">
                    {translatedCategories.map((category, catIdx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + (catIdx * 0.1), type: "spring", stiffness: 200, damping: 20 }}
                            className="glass-panel rounded-2xl md:rounded-3xl p-4 md:p-6 hover:bg-[var(--color-surface-hover)] transition-colors duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute -right-4 -top-4 md:-right-6 md:-top-6 text-6xl md:text-8xl opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                                {category.icon}
                            </div>

                            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 relative z-10">
                                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight">{category.title}</h3>
                            </div>

                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-4 md:grid-cols-3 gap-2 md:gap-3 relative z-10"
                            >
                                {category.skills.map((skill) => (
                                    <motion.div
                                        key={skill.name}
                                        variants={fadeInUpItem}
                                        className="flex flex-col items-center gap-2"
                                    >
                                        <div
                                            className="w-10 h-10 md:w-12 lg:w-14 md:h-12 lg:h-14 rounded-xl md:rounded-2xl bg-[#111] border border-[var(--color-border)] flex items-center justify-center transition-all duration-300 shadow-inner hover:-translate-y-1"
                                            title={skill.name}
                                        >
                                            <img src={skill.icon} alt={skill.name} className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 filter drop-shadow-md" loading="lazy" />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
