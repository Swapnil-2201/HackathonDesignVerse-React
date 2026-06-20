
import { createContext, useCallback, useMemo, useReducer } from 'react';

import { sendMessage as sendSymptomMessage } from '../services/geminiClient';

export const AISymptomCheckerContext = createContext(null);

const GREETING_TEXT =
  "Hello! I'm HealthBridge AI. Tell me a little about what you're experiencing, " +
  "and I'll offer some general guidance. This is educational support, not a medical diagnosis.";

function createMessage(role, text) {
  return {
    id:
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role, // 'user' | 'assistant' | 'system'
    text,
    timestamp: Date.now(),
  };
}

const initialState = {
  isOpen: false,
  messages: [],
  isBusy: false,
  isTyping: false,
  hasStarted: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, isOpen: true };

    case 'CLOSE_MODAL':
      
      return { ...state, isOpen: false };

    case 'START_CONVERSATION':
      if (state.hasStarted) return state;
      return {
        ...state,
        hasStarted: true,
        messages: [...state.messages, createMessage('assistant', GREETING_TEXT)],
      };

    case 'SEND_START':
      return {
        ...state,
        isBusy: true,
        isTyping: true,
        messages: [...state.messages, action.payload.userMessage],
      };

    case 'SEND_SUCCESS':
      return {
        ...state,
        isBusy: false,
        isTyping: false,
        messages: [...state.messages, createMessage('assistant', action.payload.text)],
      };

    case 'SEND_ERROR':
      return {
        ...state,
        isBusy: false,
        isTyping: false,
        messages: [...state.messages, createMessage('system', action.payload.text)],
      };

    case 'RESET':
      
      return { ...initialState, isOpen: state.isOpen };

    default:
      return state;
  }
}

export function AISymptomCheckerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openModal = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL' });
  }, []);

  const closeModal = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' });
  }, []);

  const startConversation = useCallback(() => {
    dispatch({ type: 'START_CONVERSATION' });
  }, []);

  const resetConversation = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = typeof text === 'string' ? text.trim() : '';
      if (!trimmed || state.isBusy) return;

      const userMessage = createMessage('user', trimmed);
      dispatch({ type: 'SEND_START', payload: { userMessage } });

      try {
        const reply = await sendSymptomMessage({
          text: trimmed,
          history: [...state.messages, userMessage],
        });
        dispatch({ type: 'SEND_SUCCESS', payload: { text: reply } });
      } catch (error) {
        dispatch({
          type: 'SEND_ERROR',
          payload: {
            text: error?.message || 'Something went wrong. Please try again.',
          },
        });
      }
    },
    [state.messages, state.isBusy]
  );

  const value = useMemo(
    () => ({
      isOpen: state.isOpen,
      messages: state.messages,
      isBusy: state.isBusy,
      isTyping: state.isTyping,
      hasStarted: state.hasStarted,
      openModal,
      closeModal,
      startConversation,
      resetConversation,
      sendMessage,
    }),
    [state, openModal, closeModal, startConversation, resetConversation, sendMessage]
  );

  return (
    <AISymptomCheckerContext.Provider value={value}>
      {children}
    </AISymptomCheckerContext.Provider>
  );
}
