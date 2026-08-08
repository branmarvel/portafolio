/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

// A simple test component to consume the context
const TestComponent = () => {
    const { language, toggleLanguage, t } = useLanguage();
    return (
        <div>
            <span data-testid="current-lang">{language}</span>
            <button data-testid="toggle-btn" onClick={toggleLanguage}>Toggle</button>
            <span data-testid="translated-text">{t('hero.title') || 'not-found'}</span>
        </div>
    );
};

describe('LanguageProvider', () => {
    let originalNavigator;
    let localStorageMock;

    beforeEach(() => {
        // Mock localStorage
        localStorageMock = (() => {
            let store = {};
            return {
                getItem: vi.fn(key => store[key] || null),
                setItem: vi.fn((key, value) => {
                    store[key] = value.toString();
                }),
                clear: vi.fn(() => {
                    store = {};
                })
            };
        })();

        vi.stubGlobal('localStorage', localStorageMock);

        // Mock navigator.language
        originalNavigator = { ...global.navigator };
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
        global.navigator = originalNavigator;
        localStorageMock.clear();
    });

    it('should default to "es" if browser language includes "es"', () => {
        vi.stubGlobal('navigator', { language: 'es-ES' });

        render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );

        expect(screen.getByTestId('current-lang').textContent).toBe('es');
    });

    it('should default to "en" if browser language does not include "es"', () => {
        vi.stubGlobal('navigator', { language: 'fr-FR' });

        render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );

        expect(screen.getByTestId('current-lang').textContent).toBe('en');
    });

    it('should prioritize localStorage preference over browser language', () => {
        vi.stubGlobal('navigator', { language: 'es-ES' });
        localStorageMock.setItem('portfolio_lang', 'en');

        render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );

        expect(screen.getByTestId('current-lang').textContent).toBe('en');
        expect(localStorageMock.getItem).toHaveBeenCalledWith('portfolio_lang');
    });

    it('should fallback to browser default if localStorage contains invalid language', () => {
        vi.stubGlobal('navigator', { language: 'en-US' });
        localStorageMock.setItem('portfolio_lang', 'fr'); // Invalid

        render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );

        expect(screen.getByTestId('current-lang').textContent).toBe('en');
    });

    it('should toggle language and update localStorage', () => {
        vi.stubGlobal('navigator', { language: 'es-ES' });

        render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );

        // Initial state
        expect(screen.getByTestId('current-lang').textContent).toBe('es');

        // Toggle
        act(() => {
            screen.getByTestId('toggle-btn').click();
        });

        // New state
        expect(screen.getByTestId('current-lang').textContent).toBe('en');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('portfolio_lang', 'en');

        // Toggle back
        act(() => {
            screen.getByTestId('toggle-btn').click();
        });

        expect(screen.getByTestId('current-lang').textContent).toBe('es');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('portfolio_lang', 'es');
    });

    it('should resolve translations correctly using the `t` function', () => {
        vi.stubGlobal('navigator', { language: 'en-US' });

        // Mocking the actual translation logic slightly for predictability if needed
        // Assuming translations['en']['hero']['title'] exists
        render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );

        // React 19 acts can be synchronous/asynchronous, wait for hydration effect
        // Note: Initial state is 'es' since the default logic evaluates the mocked navigator (en-US -> en)
        // Wait, the navigator is mocked to 'en-US', so initial state should be 'en'
        expect(screen.getByTestId('translated-text').textContent).not.toBe('not-found');
        expect(screen.getByTestId('translated-text').textContent).toBe(translations['en'].hero.title || 'hero.title');

        act(() => {
            screen.getByTestId('toggle-btn').click();
        });

        expect(screen.getByTestId('translated-text').textContent).toBe(translations['es'].hero.title || 'hero.title');
    });
});
