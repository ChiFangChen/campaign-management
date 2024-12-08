import enTranslations from '@/i18n/translations/en.json';

type TranslationType = {
  [key: string]: string | TranslationType;
};

type TParams = { [key: string]: string | number };

export const t = (key: string, params?: TParams) => {
  const translation = key.split('.').reduce<string | TranslationType>((obj, key) => {
    return typeof obj === 'object' ? obj[key] : obj;
  }, enTranslations);

  if (!translation || typeof translation !== 'string') {
    return key;
  }

  if (params) {
    return translation.replace(/{{(\w+)}}/g, (_: string, key: string) => String(params[key]) || '');
  }

  return translation;
};

export default {
  t,
  useTranslation: () => ({ t }),
};
