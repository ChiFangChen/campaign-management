const getLocalStorage = (key: string) => localStorage.getItem(key);

const setLocalStorage = (key: string, value: string) => localStorage.setItem(key, value);

export const getDefaultLanguage = () => {
  const defaultLanguage = getLocalStorage('language');
  if (defaultLanguage) return defaultLanguage;

  const browserLanguage = navigator.language || navigator.languages[0];
  const languageCode = browserLanguage?.split('-')[0] || 'en';
  return languageCode;
};

export const setDefaultLanguage = (language: string) => setLocalStorage('language', language);

export const getDefaultTheme = () => {
  const defaultDefaultTheme = getLocalStorage('theme');
  return defaultDefaultTheme || 'light';
};

export const setDefaultTheme = (theme: string) => setLocalStorage('theme', theme);
