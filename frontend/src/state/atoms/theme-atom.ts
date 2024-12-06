import { atom } from 'recoil';
import { getDefaultTheme } from '@/lib/store-utils';

export const themeAtom = atom({
  key: 'theme',
  default: getDefaultTheme(),
});
