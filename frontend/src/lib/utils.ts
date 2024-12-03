import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { mapKeys, mapValues } from 'lodash';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
