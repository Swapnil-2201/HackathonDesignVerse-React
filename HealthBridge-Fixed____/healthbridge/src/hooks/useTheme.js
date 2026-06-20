// src/hooks/useTheme.js
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/**
 * useTheme()
 *
 * Returns { theme, toggleTheme, setTheme } from ThemeContext.
 * Must be called from inside <ThemeProvider>.
 *
 * Usage:
 *   const { theme, toggleTheme } = useTheme();
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>.');
  }
  return ctx;
}
