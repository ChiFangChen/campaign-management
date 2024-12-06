import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getDefaultLanguage } from '@/lib/store-utils';
import en from './translations/en.json';
import zh from './translations/zh.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: getDefaultLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
