import styles from './MentalHealth.module.css';

/**
 * MentalHealthCard — one topic card (Stress / Anxiety / Depression / Burnout).
 *
 * Purely presentational and data-driven, same shape as TrustCard: icon,
 * title, and a short tip in; markup out. Reuses the global `.glassCard`
 * utility class (src/styles/base.css) for the glass surface — referenced
 * as a plain string, not via the local `styles` object, since it's a
 * global class defined outside this CSS module.
 */
export default function MentalHealthCard({ icon, title, tip }) {
  return (
    <div className={`glassCard ${styles.mhCard}`}>
      <div className={styles.mhIcon}>
        <i className={`fa-solid ${icon}`} aria-hidden="true" />
      </div>
      <h3>{title}</h3>
      <p className={styles.mhTip}>{tip}</p>
    </div>
  );
}
