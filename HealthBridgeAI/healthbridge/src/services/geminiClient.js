/**
 * geminiClient.js
 *
 * Single chokepoint for producing a Symptom Checker reply. Components and
 * the context never branch on "how" a reply is produced — they only ever
 * call sendMessage({ text, history }) and await a string back.
 *
 * Current implementation: a local keyword-matching stub, ported verbatim
 * from the original callGemini() — no API key, no network call, no
 * hardcoded provider endpoint of any kind.
 *
 * To wire up a real model later (Gemini, OpenAI, or anything else):
 *   - Replace the body of sendMessage() with a fetch() to your own
 *     serverless proxy (the credential stays server-side, never here).
 *   - Keep the function signature — { text, history } in, string out —
 *     identical, so AISymptomCheckerContext.jsx and every component above
 *     it needs zero changes.
 */

const KEYWORD_RESPONSES = [
  {
    keyword: 'headache',
    response:
      'Headaches can have many causes, including stress, dehydration, lack of sleep, or illness. ' +
      'Try resting, drinking water, and monitoring your symptoms. If headaches are severe or ' +
      'persistent, consult a healthcare professional. This is not a diagnosis.',
  },
  {
    keyword: 'fever',
    response:
      'A fever is often a sign that your body is fighting an infection. Stay hydrated and monitor ' +
      'your temperature. If the fever is high, persistent, or accompanied by severe symptoms, seek ' +
      'medical advice.',
  },
  {
    keyword: 'cough',
    response:
      'A cough may be related to a common cold, allergies, irritation, or other conditions. ' +
      'Consider how long it has lasted and whether you have other symptoms. If it persists, ' +
      'consult a healthcare professional.',
  },
];

const FALLBACK_RESPONSE =
  "Thank you for sharing your symptoms. I'm HealthBridge AI, a demo healthcare assistant. Based " +
  'on your description, I recommend monitoring your symptoms and consulting a qualified ' +
  'healthcare professional if they persist or worsen. This is educational guidance only and not ' +
  'a diagnosis.';

/**
 * @param {Object} params
 * @param {string} params.text - the user's latest message
 * @param {{ role: 'user' | 'assistant' | 'system', text: string }[]} [params.history]
 *   - full conversation so far, including the message just sent. Unused by
 *     the current keyword stub; kept in the contract so a future real-model
 *     integration can use it for multi-turn context without an API change.
 * @returns {Promise<string>} the assistant's reply text
 */
export async function sendMessage({ text, history }) {
  void history; // reserved for future use, not read by the stub

  const lowerText = (text || '').toLowerCase();

  const match = KEYWORD_RESPONSES.find(({ keyword }) => lowerText.includes(keyword));

  return match ? match.response : FALLBACK_RESPONSE;
}
