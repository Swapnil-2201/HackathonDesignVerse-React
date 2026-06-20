/**
 * useAISymptomChecker.js
 *
 * The only way components are meant to touch Symptom Checker state.
 * Consumes AISymptomCheckerContext and returns:
 *   { isOpen, messages, isBusy, isTyping, hasStarted,
 *     openModal, closeModal, startConversation, resetConversation, sendMessage }
 *
 * Used by: the launch entry point, the modal itself, and (per the wider
 * architecture) any other entry point that should be able to open the
 * checker, such as a Risk Meter result CTA.
 */

import { useContext } from 'react';
import { AISymptomCheckerContext } from '../context/AISymptomCheckerContext';

export function useAISymptomChecker() {
  const context = useContext(AISymptomCheckerContext);

  if (context === null) {
    throw new Error(
      'useAISymptomChecker must be used within an <AISymptomCheckerProvider>. ' +
        'Wrap your app (or the relevant subtree) in the provider from ' +
        'src/context/AISymptomCheckerContext.jsx.'
    );
  }

  return context;
}
