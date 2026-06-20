// src/context/ThemeContext.jsx
//
// Provider + context object together, per the A1 architecture doc:
//
//   <ThemeProvider> — theme: 'light' | 'dark', toggleTheme(), setTheme()
//                     Persists to localStorage; sets data-theme attribute
//                     via useEffect. Initial value is read synchronously
//                     (see note below on flash-of-wrong-theme).
//
// tokens.css already defines :root (light) and [data-theme="dark"]
// overrides — this provider is the only thing that ever writes that
// attribute, so there is exactly one source of truth for theme.

import { createContext, useCallback, useEffect, useState } from 'react';

export const ThemeContext = createContext(null);

const STORAGE_KEY = 'healthbridge-theme';

/**
 * Reads the initial theme synchronously, in this priority order:
 *   1. A previously-saved choice in localStorage.
 *   2. The OS/browser's prefers-color-scheme.
 *   3. 'light' as the final fallback.
 *
 * This runs inside useState(() => ...) (a lazy initializer), so it
 * executes once, synchronously, during the first render — before paint —
 * which avoids a flash of the wrong theme on load.
 */
function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // localStorage can throw in some privacy modes — fall through.
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  // Reflect the current theme onto <html data-theme="..."> — this is the
  // attribute tokens.css keys its dark-mode overrides off of — and persist
  // the choice so a reload doesn't flash back to the OS default.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore write failures (e.g. storage disabled) — theme still
      // applies for the current session via the attribute above.
    }
  }, [theme]);

  const setTheme = useCallback((next) => {
    setThemeState(next === 'dark' ? 'dark' : 'light');
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
