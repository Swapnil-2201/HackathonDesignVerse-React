// src/components/Counter/AnimatedCounter.jsx
import { useCounter } from '../../hooks/useCounter';
import styles from './AnimatedCounter.module.css';

/**
 * AnimatedCounter
 *
 * Props:
 *   target   {number}  The final number to count up to.
 *   suffix   {string}  Optional suffix appended to the displayed value (e.g. '+', '%').
 *   duration {number}  Animation duration in milliseconds (default: 1600).
 *   label    {string}  Descriptive label rendered beneath the number.
 */
export default function AnimatedCounter({ target, suffix = '', duration = 1600, label }) {
  const { ref, displayValue } = useCounter(target, { suffix, duration });

  return (
    <div className={styles.counter}>
      <span ref={ref} className={styles.value} aria-live="polite" aria-atomic="true">
        {displayValue}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
