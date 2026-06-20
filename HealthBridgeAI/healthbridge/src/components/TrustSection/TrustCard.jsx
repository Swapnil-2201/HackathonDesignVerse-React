import styles from './TrustSection.module.css';

/**
 * TrustCard — one credential/trust-signal card.
 *
 * Purely presentational and data-driven (icon, title, description in,
 * markup out) so TrustSection can render the full grid with a single
 * map() call and adding a 5th trust signal is a data change, not a
 * markup change.
 *
 * Reuses the global `.glassCard` utility class (defined once in
 * src/styles/base.css) for the glassmorphism surface, exactly like
 * BarrierCard does — this keeps one source of truth for the glass
 * effect rather than redefining backdrop-filter/border/shadow here.
 * `.glassCard` is referenced as a plain string, NOT via the local
 * `styles` object, since it isn't defined in TrustSection.module.css
 * and CSS Modules would only export tokens for classes declared in
 * that specific file.
 */
export default function TrustCard({ icon, title, description }) {
  return (
    <div className={`glassCard ${styles.trustCard}`}>
      <i className={`fa-solid ${icon} ${styles.trustIcon}`} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
