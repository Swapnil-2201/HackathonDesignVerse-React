// src/hooks/useCounter.js
import { useEffect, useRef, useState } from 'react';

/**
 * useCounter(target, options)
 *
 * Animates a number counting up from 0 to `target` once the element
 * attached to the returned `ref` scrolls into view, using an
 * IntersectionObserver (cleaned up per-instance) rather than one shared
 * scroll listener. Animation runs only once per mount.
 *
 * @param {number} target           final value to count up to
 * @param {Object} [options]
 * @param {string} [options.suffix='']     appended to the displayed value (e.g. '+', '%')
 * @param {number} [options.duration=1600] animation duration in ms
 *
 * @returns {{ ref: React.RefObject, displayValue: string }}
 *   Attach `ref` to the element that should trigger the animation when
 *   visible; render `displayValue` as its text content.
 */
export function useCounter(target, { suffix = '', duration = 1600 } = {}) {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState(`0${suffix}`);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    let frameId = null;

    function animate() {
      hasAnimatedRef.current = true;
      const startTime = performance.now();

      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic, so the count settles rather than stopping abruptly
        const eased = 1 - (1 - progress) ** 3;
        const value = Math.round(target * eased);
        setDisplayValue(`${value}${suffix}`);

        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        }
      }

      frameId = requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            animate();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, suffix, duration]);

  return { ref, displayValue };
}
