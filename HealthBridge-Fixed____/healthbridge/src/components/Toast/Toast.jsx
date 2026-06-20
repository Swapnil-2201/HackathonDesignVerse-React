// src/components/Toast/Toast.jsx
import { useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ToastContext } from '../../context/ToastContext';
import styles from './Toast.module.css';

/**
 * Toast
 *
 * Portal-rendered. Reads the queue from ToastContext directly so it never
 * needs to be wired up via props — just mount it once near the app root.
 *
 * Only the head of the queue is shown at any time. When that item is
 * dismissed the next one slides in.
 *
 * <Toast /> is a singleton; render it once inside <ToastProvider>.
 */
export default function Toast() {
  const { queue, dismiss } = useContext(ToastContext);
  const active             = queue[0] ?? null;

  // Track the id that is currently mounted so we can drive the CSS transition.
  const [visibleId, setVisibleId] = useState(null);
  const [entering, setEntering]   = useState(false);
  const enterTimerRef              = useRef(null);

  useEffect(() => {
    if (!active) {
      setVisibleId(null);
      setEntering(false);
      clearTimeout(enterTimerRef.current);
      return;
    }

    if (active.id !== visibleId) {
      // New item at the head — reset then trigger enter transition.
      setEntering(false);
      clearTimeout(enterTimerRef.current);
      setVisibleId(active.id);
      // rAF pair ensures the browser applies the base state before the
      // entering class is added, so the CSS transition actually fires.
      enterTimerRef.current = setTimeout(() => setEntering(true), 16);
    }

    return () => clearTimeout(enterTimerRef.current);
  }, [active, visibleId]);

  if (!active) return null;

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`${styles.toast} ${entering ? styles.toastVisible : ''}`}
    >
      <span className={styles.message}>{active.message}</span>
      <button
        type="button"
        className={styles.close}
        aria-label="Dismiss notification"
        onClick={() => dismiss(active.id)}
      >
        <i className="fa-solid fa-xmark" aria-hidden="true" />
      </button>
    </div>,
    document.body,
  );
}
