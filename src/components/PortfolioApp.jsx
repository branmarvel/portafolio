import React, { lazy, Suspense } from 'react';
import ScrollController from './ScrollController';
import HeroSection from './HeroSection';
// Heavy sections are lazy loaded to improve initial bundle size and TTI
const SkillsSection = lazy(() => import('./SkillsSection'));
const ProjectsSection = lazy(() => import('./ProjectsSection'));
const AboutSection = lazy(() => import('./AboutSection'));
const ContactSection = lazy(() => import('./ContactSection'));
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import CookieConsent from './CookieConsent';
import { LanguageProvider } from '../context/LanguageContext';

const sections = [
    { component: HeroSection, id: 'hero' },
    { component: SkillsSection, id: 'skills' },
    { component: ProjectsSection, id: 'projects' },
    { component: AboutSection, id: 'about' },
    { component: ContactSection, id: 'contact' }
];

// Fallback ultraligero
const SectionLoader = () => (
    <div className="w-full h-full flex items-center justify-center bg-[var(--color-base)]">
        <div className="w-6 h-6 rounded-full border-2 border-[var(--color-tungsten)] border-t-transparent animate-spin opacity-50"></div>
    </div>
);

export default function PortfolioApp() {
    return (
        <LanguageProvider>
            <CustomCursor />
            <Navbar />
            <Suspense fallback={<SectionLoader />}>
                <ScrollController sections={sections} />
            </Suspense>
            <CookieConsent />
            <div className="noise-overlay"></div>
        </LanguageProvider>
    );
}
