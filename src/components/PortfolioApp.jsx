import React from 'react';
import ScrollController from './ScrollController';
import HeroSection from './HeroSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import { LanguageProvider } from '../context/LanguageContext';

const sections = [
    { component: HeroSection, id: 'hero' },
    { component: SkillsSection, id: 'skills' },
    { component: ProjectsSection, id: 'projects' },
    { component: AboutSection, id: 'about' },
    { component: ContactSection, id: 'contact' }
];

export default function PortfolioApp() {
    return (
        <LanguageProvider>
            <CustomCursor />
            <Navbar />
            <ScrollController sections={sections} />
        </LanguageProvider>
    );
}
