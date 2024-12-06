import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '@/state';

export const ThemeProvider = ({ children }: ComponentWithChildren) => {
  const theme = useRecoilValue(themeAtom);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
};
