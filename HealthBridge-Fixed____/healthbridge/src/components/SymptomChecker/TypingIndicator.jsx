/**
 * TypingIndicator.jsx
 *
 * Visual "assistant is typing" cue. Conditionally rendered by the modal
 * when isTyping is true — no hidden attribute toggling required, React
 * mounts/unmounts it declaratively.
 */

import styles from './SymptomChecker.module.css';

export function TypingIndicator() {
  return (
    <div className={styles.agentTyping} role="status" aria-live="polite">
      <span className={styles.srOnly}>HealthBridge AI is typing…</span>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.dot} aria-hidden="true" />
    </div>
  );
}
