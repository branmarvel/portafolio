import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('es'); // Default initial
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Detect browser language on mount
        const browserLang = navigator.language || navigator.userLanguage;
        const defaultLang = browserLang.toLowerCase().includes('es') ? 'es' : 'en';

        // Optional: check localStorage for saved preference
        const savedLang = localStorage.getItem('portfolio_lang');

        if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
            setLanguage(savedLang);
        } else {
            setLanguage(defaultLang);
        }
        setIsLoaded(true);
    }, []);

    const toggleLanguage = () => {
        const newLang = language === 'es' ? 'en' : 'es';
        setLanguage(newLang);
        localStorage.setItem('portfolio_lang', newLang);
    };

    // Helper to get nested translation keys 'hero.title'
    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                return key; // Fallback to raw key if not found
            }
        }
        return value;
    };

    // Prevent rendering until browser language is detected to avoid hydration flash
    if (!isLoaded) return null;

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
