import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations } from '../translations';

type Language = 'pt' | 'en' | 'th';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (path: string, params?: Record<string, any>) => any;
    currentTranslations: typeof translations['pt'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('th');

    const currentTranslations = translations[language];

    // Helper to access nested properties by string path (e.g., 'hero.days')
    const t = (path: string, params?: Record<string, any>) => {
        const keys = path.split('.');
        let value: any = currentTranslations;

        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key as keyof typeof value];
            } else {
                return path; // Return path if not found
            }
        }

        if (typeof value === 'string' && params) {
            Object.entries(params).forEach(([key, val]) => {
                value = value.replace(`{${key}}`, String(val));
            });
        }

        return value;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, currentTranslations }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
