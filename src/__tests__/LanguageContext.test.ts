import { describe, it, expect } from 'vitest';
import { resolveTranslation } from '../context/LanguageContext';

describe('resolveTranslation', () => {
    const mockTranslations = {
        en: {
            greeting: 'Hello',
            hero: {
                title: 'Welcome',
                subtitle: 'To my portfolio'
            },
            nav: {
                links: {
                    home: 'Home Link'
                }
            }
        },
        es: {
            greeting: 'Hola',
            hero: {
                title: 'Bienvenido',
                subtitle: 'A mi portafolio'
            },
            nav: {
                links: {
                    home: 'Enlace de inicio'
                }
            }
        }
    };

    it('should resolve a valid top-level key', () => {
        expect(resolveTranslation(mockTranslations, 'en', 'greeting')).toBe('Hello');
        expect(resolveTranslation(mockTranslations, 'es', 'greeting')).toBe('Hola');
    });

    it('should resolve a valid nested key (1 level deep)', () => {
        expect(resolveTranslation(mockTranslations, 'en', 'hero.title')).toBe('Welcome');
        expect(resolveTranslation(mockTranslations, 'es', 'hero.subtitle')).toBe('A mi portafolio');
    });

    it('should resolve a valid nested key (2 levels deep)', () => {
        expect(resolveTranslation(mockTranslations, 'en', 'nav.links.home')).toBe('Home Link');
        expect(resolveTranslation(mockTranslations, 'es', 'nav.links.home')).toBe('Enlace de inicio');
    });

    it('should fallback to the raw key if the key is not found (top-level)', () => {
        expect(resolveTranslation(mockTranslations, 'en', 'missingKey')).toBe('missingKey');
    });

    it('should fallback to the raw key if the nested key is not found', () => {
        expect(resolveTranslation(mockTranslations, 'en', 'hero.missingKey')).toBe('hero.missingKey');
    });

    it('should fallback to the raw key if intermediate nested structures are missing', () => {
        expect(resolveTranslation(mockTranslations, 'en', 'missingSection.title')).toBe('missingSection.title');
        expect(resolveTranslation(mockTranslations, 'es', 'nav.missingLinks.home')).toBe('nav.missingLinks.home');
    });

    it('should handle falsy/empty key inputs gracefully', () => {
        expect(resolveTranslation(mockTranslations, 'en', '')).toBe('');
        expect(resolveTranslation(mockTranslations, 'en', null)).toBe(null);
        expect(resolveTranslation(mockTranslations, 'en', undefined)).toBe(undefined);
    });

    it('should fallback to the raw key if the language does not exist in translations', () => {
        expect(resolveTranslation(mockTranslations, 'fr', 'hero.title')).toBe('hero.title');
    });
});
