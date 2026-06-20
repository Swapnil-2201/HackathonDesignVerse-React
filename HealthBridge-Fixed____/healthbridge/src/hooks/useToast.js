// src/hooks/useToast.js
import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';

/**
 * useToast()
 *
 * Returns { showToast, dismiss } from ToastContext.
 * Must be called from inside <ToastProvider>.
 *
 * Usage:
 *   const { showToast } = useToast();
 *   showToast('Could not reach the AI assistant.');
 */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastProvider>.');
  }
  return { showToast: ctx.showToast, dismiss: ctx.dismiss };
}
