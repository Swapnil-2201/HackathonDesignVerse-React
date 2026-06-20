/**
 * ChatMessage.jsx
 *
 * Renders one message bubble. Replaces the original appendAgentMessage()
 * function, which manually created and appended DOM nodes — here a bubble
 * is just a declarative function of `message`.
 */

import styles from './SymptomChecker.module.css';

const ROLE_LABEL = {
  user: 'You',
  assistant: 'HealthBridge AI',
  system: 'System notice',
};

const ROLE_CLASS = {
  user: styles.msgUser,
  assistant: styles.msgAssistant,
  system: styles.msgSystem,
};

export function ChatMessage({ message }) {
  const { role, text } = message;
  const roleClass = ROLE_CLASS[role] || '';

  return (
    <div
      className={`${styles.agentMsg} ${roleClass}`.trim()}
      role={role === 'system' ? 'alert' : undefined}
    >
      <span className={styles.srOnly}>{(ROLE_LABEL[role] || role) + ': '}</span>
      {text}
    </div>
  );
}
