// src/context/ToastContext.jsx
import { createContext, useCallback, useRef, useState } from 'react';

export const ToastContext = createContext(null);

const AUTO_DISMISS_MS = 3200;

/**
 * ToastProvider
 *
 * Manages a queue of toasts. Each entry:
 *   { id: number, message: string }
 *
 * Only one toast is visible at a time. When the active toast is dismissed
 * (manually or via the auto-dismiss timer) the next item in the queue is
 * promoted and a fresh timer starts.
 *
 * Wrap the app root (inside any providers that need to call showToast,
 * e.g. AISymptomCheckerProvider must sit inside ToastProvider).
 */
export function ToastProvider({ children }) {
  const [queue, setQueue]   = useState([]);   // [{ id, message }, ...]
  const timerRef            = useRef(null);
  const idRef               = useRef(0);

  // Remove the toast with the given id and clear its timer.
  const dismiss = useCallback((id) => {
    clearTimeout(timerRef.current);
    setQueue((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Start the auto-dismiss timer for the item at the head of the queue.
  const scheduleNext = useCallback((nextQueue) => {
    clearTimeout(timerRef.current);
    if (nextQueue.length === 0) return;
    const head = nextQueue[0];
    timerRef.current = setTimeout(() => {
      setQueue((prev) => {
        const updated = prev.filter((t) => t.id !== head.id);
        scheduleNext(updated);
        return updated;
      });
    }, AUTO_DISMISS_MS);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const showToast = useCallback((message) => {
    const id = ++idRef.current;
    setQueue((prev) => {
      const next = [...prev, { id, message }];
      // Only (re-)schedule when the queue was previously empty,
      // i.e. this item just became the head.
      if (prev.length === 0) scheduleNext(next);
      return next;
    });
  }, [scheduleNext]);

  return (
    <ToastContext.Provider value={{ queue, showToast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}
