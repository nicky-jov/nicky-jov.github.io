"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import ja from '../locales/ja.json';
import { TranslationSchema } from '../types/translations';

type SupportedLanguage = 'en' | 'ja';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: string) => void;
  translations: TranslationSchema;
  t: (key: string) => string;
}

const translations: { [key in SupportedLanguage]: TranslationSchema } = { en, ja };
const SUPPORTED_LANGUAGES = ['en', 'ja'] as const;
const STORAGE_KEY = 'preferred-language';

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  translations: {} as TranslationSchema,
  t: (key: string) => key
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  useEffect(() => {
    const getInitialLanguage = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED_LANGUAGES.includes(stored as SupportedLanguage)) {
        return stored as SupportedLanguage;
      }

      const systemLang = navigator.language.split('-')[0];
      return SUPPORTED_LANGUAGES.includes(systemLang as SupportedLanguage) 
        ? systemLang as SupportedLanguage 
        : 'en';
    };

    setLanguageState(getInitialLanguage());
  }, []);

  const setLanguage = (lang: string) => {
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      localStorage.setItem(STORAGE_KEY, lang);
      setLanguageState(lang as SupportedLanguage);
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];
    
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    
    return typeof value === 'string' ? value.replace(/\n/g, '<br />') : key;
  };

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    translations: translations[language],
    t
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);