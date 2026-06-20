/**
 * SymptomCheckerModal.jsx
 *
 * Portal-free version for simplicity (render this once, near the app root,
 * inside <AISymptomCheckerProvider>). Replaces agentModal / agentBackdrop /
 * agentPanel / agentHeader / agentSetup(dropped) / agentMessages /
 * agentTyping / agentForm from the original HTML+JS.
 *
 * Notes on architectural decisions carried over from this thread:
 * - AgentSetup (the BYOK key-entry card) is intentionally omitted. It never
 *   rendered in the original build (hasApiKey() always returned true), and
 *   the approved service architecture routes through a backend proxy, so
 *   there is no client-side key state to collect.
 * - All DOM interaction here (focus, scroll position, body overflow) goes
 *   through refs inside useEffect — the idiomatic React replacement for the
 *   original's manual document.getElementById / .hidden / .innerHTML calls.
 */

import { useEffect, useRef, useState } from 'react';
import { useAISymptomChecker } from '../../hooks/useAISymptomChecker';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import styles from './SymptomChecker.module.css';

export function SymptomCheckerModal() {
  const {
    isOpen,
    messages,
    isBusy,
    isTyping,
    hasStarted,
    closeModal,
    startConversation,
    resetConversation,
    sendMessage,
  } = useAISymptomChecker();

  const [draft, setDraft] = useState('');
  const inputRef = useRef(null);
  const messagesRef = useRef(null);
  const panelRef = useRef(null);

  // Auto-greet the first time the modal opens, mirroring startAgentConversation()
  useEffect(() => {
    if (isOpen && !hasStarted) {
      startConversation();
    }
  }, [isOpen, hasStarted, startConversation]);

  // Move focus into the dialog when it opens, and back to the input once free to type
  useEffect(() => {
    if (isOpen && !isBusy) {
      inputRef.current?.focus();
    }
  }, [isOpen, isBusy]);

  // Keep the conversation scrolled to the latest message/typing indicator
  useEffect(() => {
    const node = messagesRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [messages, isTyping]);

  // Close on Escape, matching the original keydown listener
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  // Lock background scroll while open, matching document.body.style.overflow
  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed || isBusy) return;
    setDraft('');
    sendMessage(trimmed);
  }

  function handleReset() {
    resetConversation();
    setDraft('');
  }

  return (
    <div className={styles.agentModal}>
      <div className={styles.agentBackdrop} onClick={closeModal} aria-hidden="true" />

      <div
        className={styles.agentPanel}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="agentTitle"
      >
        <header className={styles.agentHeader}>
          <div className={styles.agentHeaderInfo}>
            <span className={styles.agentAvatar} aria-hidden="true">
              <i className="fa-solid fa-heart-pulse" />
            </span>
            <div>
              <h3 id="agentTitle">HealthBridge AI Guide</h3>
              <p className={styles.agentSubtitle}>Private conversation · Not a diagnosis</p>
            </div>
          </div>

          <div className={styles.agentHeaderActions}>
            <button
              type="button"
              className={styles.iconButton}
              onClick={handleReset}
              title="Start new conversation"
              aria-label="Start new conversation"
            >
              <i className="fa-solid fa-rotate-right" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.iconButton}
              onClick={closeModal}
              aria-label="Close chat"
            >
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
          </div>
        </header>

        <div
          className={styles.agentMessages}
          ref={messagesRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>

        {isTyping && <TypingIndicator />}

        <form className={styles.agentInputRow} onSubmit={handleSubmit}>
          <label htmlFor="agentInput" className={styles.srOnly}>
            Message HealthBridge AI
          </label>
          <input
            id="agentInput"
            ref={inputRef}
            type="text"
            className={styles.agentInput}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Type your message…"
            autoComplete="off"
            disabled={isBusy}
          />
          <button
            type="submit"
            className={styles.agentSend}
            disabled={isBusy || !draft.trim()}
            aria-label="Send message"
          >
            <i className="fa-solid fa-paper-plane" aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  );
}
