/**
 * RiskResult.jsx
 *
 * Renders the circular dial and outcome copy once the quiz is complete.
 * Replaces the dialFill/dialLabel/dialStatus/riskLevelTitle/
 * riskRecommendation/riskMotivation DOM writes at the end of computeRisk().
 *
 * The two-phase dashoffset update (full circumference on mount, then the
 * real target on the next animation frame) reproduces the original's
 * `dialFill.style.strokeDashoffset = DIAL_CIRCUMFERENCE; requestAnimationFrame(...)`
 * sequence, which is what makes the ring sweep in via CSS transition
 * instead of snapping straight to its final value.
 */

import { useEffect, useState } from 'react';
import styles from './RiskMeter.module.css';

const DIAL_RADIUS = 120;
const DIAL_CIRCUMFERENCE = 754; // 2 * PI * 120 — matches the original constant exactly

export function RiskResult({ result }) {
  const { percentage, level, color, recommendation, motivation } = result;

  // Original: Math.max(pct, 8) — keeps a visible sliver even at 0%
  const displayPercentage = Math.max(percentage, 8);
  const targetOffset =
    DIAL_CIRCUMFERENCE - (DIAL_CIRCUMFERENCE * displayPercentage) / 100;

  const [dashOffset, setDashOffset] = useState(DIAL_CIRCUMFERENCE);

  useEffect(() => {
    setDashOffset(DIAL_CIRCUMFERENCE);
    const frame = requestAnimationFrame(() => {
      setDashOffset(targetOffset);
    });
    return () => cancelAnimationFrame(frame);
  }, [targetOffset]);

  return (
    <div className={`${styles.riskOutput} ${styles.show}`}>
      <div className={styles.dialWrap}>
        <svg
          viewBox="0 0 260 260"
          className={styles.dialSvg}
          role="img"
          aria-label={`Risk result: ${level}, ${percentage} percent`}
        >
          <circle cx="130" cy="130" r={DIAL_RADIUS} className={styles.dialTrack} />
          <circle
            cx="130"
            cy="130"
            r={DIAL_RADIUS}
            className={styles.dialFill}
            style={{
              stroke: color,
              strokeDasharray: DIAL_CIRCUMFERENCE,
              strokeDashoffset: dashOffset,
            }}
          />
        </svg>
        <div className={styles.dialCenter}>
          <span className={styles.dialLabel}>Your result</span>
          <span className={styles.dialStatus} style={{ color }}>
            {level}
          </span>
        </div>
      </div>

      <h3 className={styles.riskLevelTitle} style={{ color }}>
        {level}
      </h3>
      <p className={styles.riskRecommendation}>{recommendation}</p>
      <p className={styles.riskMotivation}>{motivation}</p>
    </div>
  );
}
