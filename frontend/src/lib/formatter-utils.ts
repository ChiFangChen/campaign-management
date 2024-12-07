import i18n from 'i18next';
import { mapKeys, mapValues } from 'lodash';

export const camelizeKeys = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map((item) => camelizeKeys(item)) as T;
  } else if (obj !== null && typeof obj === 'object') {
    return mapKeys(
      mapValues(obj, (value) => camelizeKeys(value)),
      (_, key) => key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    ) as T;
  }
  return obj;
};

export const decamelizeKeys = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map((item) => decamelizeKeys(item)) as T;
  } else if (obj !== null && typeof obj === 'object') {
    return mapKeys(
      mapValues(obj, (value) => decamelizeKeys(value)),
      (_, key) => key.replace(/([A-Z])/g, (letter) => `_${letter.toLowerCase()}`) // CamelCase -> snake_case
    ) as T;
  }
  return obj;
};

const getLocale = () => {
  const { language } = i18n;
  switch (language) {
    case 'zh':
      return 'zh-TW';
    case 'en':
    default:
      return 'en-US';
  }
};

export const readableTime = (dateString: string) => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat(getLocale(), {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  return formatter.format(date);
};

export function formatAmount(value?: number, currency = 'USD') {
  if (value === undefined) return value;
  return new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
