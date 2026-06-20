// src/hooks/usePinSearch.js
import { useState, useCallback, useMemo } from 'react';
import { RESOURCE_QUERIES } from '../data/resources';

const PIN_REGEX = /^\d{6}$/;

/**
 * Encapsulates all Resource Hub state and behaviour:
 *   - pinCode  : validated, committed PIN (empty string until first valid search)
 *   - draft    : the current value of the text input (controlled)
 *   - mapSrc   : memoized iframe src — updates only when pinCode changes
 *   - hasResults : true once a valid PIN has been committed
 *   - statusText : human-readable status line beneath the form
 *   - setDraft  : setter for the controlled input
 *   - submitPin : validates draft; returns true on success, false on failure
 *                 (caller is responsible for calling showToast on false)
 *   - openResourceSearch(type) : opens Google Maps in a new tab for the given resource type
 */
export function usePinSearch() {
  const [draft, setDraft]       = useState('');
  const [pinCode, setPinCode]   = useState('');
  const [hasResults, setHasResults] = useState(false);

  // Derive the map iframe src from the committed pinCode.
  // When no PIN has been committed yet, show a default wide India view.
  const mapSrc = useMemo(() => {
    if (!pinCode) {
      return 'https://maps.google.com/maps?q=hospitals%20in%20India&z=5&output=embed';
    }
    const query = `hospitals near ${pinCode} India`;
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=13&output=embed`;
  }, [pinCode]);

  const statusText = pinCode
    ? `Showing healthcare resources near PIN ${pinCode}`
    : 'Enter your area PIN code to personalize the resources below.';

  /**
   * Validates draft and commits it as the active PIN.
   * Returns true if valid, false if the PIN is not exactly 6 digits.
   */
  const submitPin = useCallback(() => {
    const trimmed = draft.trim();
    if (!PIN_REGEX.test(trimmed)) {
      return false;
    }
    setPinCode(trimmed);
    setHasResults(true);
    return true;
  }, [draft]);

  /**
   * Builds a Google Maps search URL for the given resource type and opens it.
   * Falls back to the raw type string if not found in RESOURCE_QUERIES.
   */
  const openResourceSearch = useCallback(
    (type) => {
      const base  = RESOURCE_QUERIES[type] || type;
      const loc   = pinCode ? `near ${pinCode} India` : 'near me';
      const query = `${base} ${loc}`;
      const url   = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
      window.open(url, '_blank', 'noopener');
    },
    [pinCode],
  );

  return {
    draft,
    setDraft,
    pinCode,
    mapSrc,
    hasResults,
    statusText,
    submitPin,
    openResourceSearch,
  };
}
