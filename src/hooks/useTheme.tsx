import { useState, useEffect, useCallback } from 'react';

/** @see gatsby-ssr.js */
declare global {
  interface Window {
    __theme: string
    __setPreferredTheme: (theme: string) => void
    __onThemeChange: (theme: string) => void
  }
}

const useTheme = () => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTheme(window.__theme)
    }

    window.__onThemeChange = newTheme => {
      setTheme(newTheme)
    }
  }, []);

  const themeHandler = useCallback(() => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    window.__setPreferredTheme(nextTheme);
  }, [theme]);

  return {theme, themeHandler};
};

export default useTheme;
