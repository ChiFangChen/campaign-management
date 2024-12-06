export const getDefaultLanguage = () => {
  const defaultLanguage = localStorage.getItem('language');
  if (defaultLanguage) return defaultLanguage;

  const browserLanguage = navigator.language || navigator.languages[0];
  const languageCode = browserLanguage?.split('-')[0] || 'en';
  return languageCode;
};

export const setDefaultLanguage = (language: string) => localStorage.setItem('language', language);
