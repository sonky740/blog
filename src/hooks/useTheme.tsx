import { useState } from 'react';

const useTheme = () => {
  const preferColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light';
  const localTheme = localStorage.getItem('theme');
  const initialTheme = localTheme || preferColorScheme;
  const [theme, setTheme] = useState(initialTheme);

  const setMode = (mode: string) => {
    localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeHandler = () => {
    theme === 'light' ? setMode('dark') : setMode('light');
  };

  return [theme, themeHandler];
};

export default useTheme;
