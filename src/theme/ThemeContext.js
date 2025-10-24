// src/theme/ThemeContext.jsx
'use client';
import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles } from '@mui/material';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';

const ColorModeContext = createContext();

export const useColorMode = () => useContext(ColorModeContext);

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');
  const [version, setVersion] = useState(0);
  const [mounted, setMounted] = useState(false); // ⬅️ NEW

  const getSystemTheme = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'Dark'
        : 'Light';
    }
    return 'Light';
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('app-theme') || 'System';
    setMode(savedMode);
    setMounted(true); //
  }, []);

  useEffect(() => {
    if (mode !== 'System') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setVersion((prev) => prev + 1);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode]);

  const theme = useMemo(() => {
    if (mode === 'Light') return lightTheme;
    if (mode === 'Dark') return lightTheme;
    return getSystemTheme() === 'Dark' ? lightTheme : lightTheme;
  }, [mode, version]);

  const handleSetMode = (newMode) => {
    setMode(newMode);
    localStorage.setItem('app-theme', newMode);
  };

  if (!mounted) return null;

  return (
    <ColorModeContext.Provider value={{ mode, setMode: handleSetMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            'input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill':
            {
              WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
              WebkitTextFillColor: `${theme.palette.text.primary} !important`,
              caretColor: `${theme.palette.text.primary} !important`,
              transition: 'background-color 9999s ease-in-out 0s !important',
            },
          }}
        />

        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
