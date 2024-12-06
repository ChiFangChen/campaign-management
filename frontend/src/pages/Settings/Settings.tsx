import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';

import { setDefaultTheme, setDefaultLanguage } from '@/lib/store-utils';
import { themeAtom } from '@/state';
import {
  Title,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  Switch,
} from '@/components';

const languages = [
  { label: 'English', value: 'en' },
  { label: '繁體中文', value: 'zh' },
];

export const Settings = () => {
  const [theme, setTheme] = useRecoilState(themeAtom);

  const {
    i18n,
    i18n: { language },
    t,
  } = useTranslation();

  const handleThemeChange = (value: boolean) => {
    const newTheme = value ? 'dark' : 'light';
    setTheme(newTheme);
    setDefaultTheme(newTheme);
  };

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    setDefaultLanguage(value);
  };

  return (
    <div>
      <Title>{t('settings.title')}</Title>
      <div className="my-8 gap-4 flex flex-wrap">
        <div className="flex gap-4 items-center w-full">
          <Label className="w-16" htmlFor="theme">
            {t('settings.theme')}
          </Label>
          <div className="flex items-center gap-2">
            <Label>{t('settings.light')}</Label>
            <Switch id="theme" checked={theme === 'dark'} onCheckedChange={handleThemeChange} />
            <Label>{t('settings.dark')}</Label>
          </div>
        </div>
        <div className="flex gap-4 items-center w-full">
          <Label className="w-16">{t('settings.language')}</Label>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue id="language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {languages.map(({ label, value }) => (
                  <SelectItem key={value} className="cursor-pointer" value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
