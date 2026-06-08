import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const resolveTranslation = (translationsObj, lang, key) => {
    if (!key || typeof key !== 'string') return key;
    const keys = key.split('.');
    let value = translationsObj[lang];

    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            return key; // Fallback to raw key if not found
        }
    }
    return value;
};

export const useLanguage = () => useContext(LanguageContext);

// Module-level cache to persist translation lookups across renders
const tCacheMap = new Map();

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
    const t = useCallback((key) => {
        let langCache = tCacheMap.get(language);
        if (!langCache) {
            langCache = new Map();
            tCacheMap.set(language, langCache);
        }
        if (langCache.has(key)) return langCache.get(key);

        const value = resolveTranslation(translations, language, key);
        langCache.set(key, value);
        return value;
    }, [language]);


    // Prevent rendering until browser language is detected to avoid hydration flash
    if (!isLoaded) return null;

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
