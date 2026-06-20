// src/components/ThemeToggle/ThemeToggle.jsx
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

/**
 * ThemeToggle
 *
 * Small icon button rendered inside Navbar. Consumes ThemeContext via
 * useTheme() — no props needed, it's a self-contained global control.
 *
 * Shows a moon icon when light (click to go dark) and a sun icon when
 * dark (click to go light), matching the common "icon = the mode you'll
 * switch to" convention.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true" />
    </button>
  );
}
