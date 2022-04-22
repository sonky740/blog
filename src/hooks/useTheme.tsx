import { useState, useLayoutEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useLayoutEffect(() => {
    const preferColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const localTheme = localStorage.getItem('theme');
    const initialTheme = localTheme || preferColorScheme;
    setTheme(initialTheme);
    document.body.className = initialTheme;
  }, []);

  const themeHandler = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.body.className = nextTheme;
  };

  return [theme, themeHandler];
};

export default useTheme;
