import { describe, it, expect } from 'vitest';
import { translations } from '../i18n/translations.js';

describe('i18n Translation Integrity', () => {
  it('should export both ES and EN locales', () => {
    expect(translations).toHaveProperty('es');
    expect(translations).toHaveProperty('en');
  });

  it('should have matching top-level keys in ES and EN', () => {
    const esKeys = Object.keys(translations.es).sort();
    const enKeys = Object.keys(translations.en).sort();
    expect(esKeys).toEqual(enKeys);
  });

  it('should have matching nested keys for every section', () => {
    const sections = Object.keys(translations.es);
    for (const section of sections) {
      const esKeys = Object.keys(translations.es[section]).sort();
      const enKeys = Object.keys(translations.en[section]).sort();
      expect(enKeys, `Missing keys in en.${section}`).toEqual(esKeys);
    }
  });

  it('should not have empty string values in any locale', () => {
    const checkEmpty = (obj, path = '') => {
      for (const [key, value] of Object.entries(obj)) {
        const fullPath = path ? `${path}.${key}` : key;
        if (typeof value === 'string') {
          expect(value.trim(), `Empty value at ${fullPath}`).not.toBe('');
        } else if (typeof value === 'object' && value !== null) {
          checkEmpty(value, fullPath);
        }
      }
    };
    checkEmpty(translations.es, 'es');
    checkEmpty(translations.en, 'en');
  });
});

describe('Project Data Consistency', () => {
  const esProjects = translations.es.projects;
  const enProjects = translations.en.projects;

  const projectPrefixes = ['sgcpLegacy', 'sgcp', 'utext', 'erp', 'jutba', 'calc', 'movi'];

  it('should have title, role, and description for every project in ES', () => {
    for (const prefix of projectPrefixes) {
      expect(esProjects, `Missing ${prefix}Title in ES`).toHaveProperty(`${prefix}Title`);
      expect(esProjects, `Missing ${prefix}Role in ES`).toHaveProperty(`${prefix}Role`);
      expect(esProjects, `Missing ${prefix}Desc in ES`).toHaveProperty(`${prefix}Desc`);
    }
  });

  it('should have title, role, and description for every project in EN', () => {
    for (const prefix of projectPrefixes) {
      expect(enProjects, `Missing ${prefix}Title in EN`).toHaveProperty(`${prefix}Title`);
      expect(enProjects, `Missing ${prefix}Role in EN`).toHaveProperty(`${prefix}Role`);
      expect(enProjects, `Missing ${prefix}Desc in EN`).toHaveProperty(`${prefix}Desc`);
    }
  });
});
