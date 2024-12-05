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

export const readableTime = (dateString: string, locale: string = 'en-US') => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  return formatter.format(date);
};

export function formatAmount(value: number) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
