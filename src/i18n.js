// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importa as traduções
import translationEN from './locales/en/translation.json';
import translationPT from './locales/pt/translation.json';
import translationES from './locales/es/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  pt: {
    translation: translationPT
  },
  es: {
    translation: translationES
  }
};

i18n
  .use(LanguageDetector) // Detecta o idioma do navegador
  .use(initReactI18next) // Passa o i18n para o react-i18next
  .init({
    resources,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false // React já escapa os valores por padrão
    }
  });

export default i18n;
