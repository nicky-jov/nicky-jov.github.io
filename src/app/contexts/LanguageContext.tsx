"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import ja from '../locales/ja.json';

type Translations = {
  [key: string]: any;
};

const translations: { [key: string]: Translations } = { en, ja };
const SUPPORTED_LANGUAGES = ['en', 'ja'];
const STORAGE_KEY = 'preferred-language';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => { },
  t: () => '',
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    const getInitialLanguage = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
        return stored;
      }

      const systemLang = navigator.language.split('-')[0];
      return SUPPORTED_LANGUAGES.includes(systemLang) ? systemLang : 'en';
    };

    setLanguageState(getInitialLanguage());
  }, []);

  const setLanguage = (lang: string) => {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      localStorage.setItem(STORAGE_KEY, lang);
      setLanguageState(lang);
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

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);