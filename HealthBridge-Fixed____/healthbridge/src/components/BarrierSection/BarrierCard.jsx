import styles from './BarrierSection.module.css';

/**
 * BarrierCard — one barrier card (Cost, Time, Fear, Distance, Stigma,
 * Awareness).
 *
 * Purely presentational and data-driven, same shape as TrustCard /
 * MentalHealthCard: icon, title, and description in; markup out.
 * Reuses the global `.glassCard` utility class (src/styles/base.css)
 * for the glass surface — referenced as a plain string, not via the
 * local `styles` object, since it's defined outside this CSS module.
 */
export default function BarrierCard({ icon, title, description }) {
  return (
    <div className={`glassCard ${styles.barrierCard}`}>
      <div className={styles.barrierIcon}>
        <i className={`fa-solid ${icon}`} aria-hidden="true" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
