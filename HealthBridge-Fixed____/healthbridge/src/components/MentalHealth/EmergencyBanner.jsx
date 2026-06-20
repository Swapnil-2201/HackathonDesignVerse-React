import Button from '../ui/Button/Button';
import { emergencyContact } from '../../data/mentalHealth';
import styles from './MentalHealth.module.css';

/**
 * EmergencyBanner — crisis-support call-to-action at the bottom of the
 * Mental Health section.
 *
 * Reuses the global `.glassCard` surface (same as MentalHealthCard) plus
 * the shared <Button> component's `variant="emergency"` style, which was
 * built specifically for this in the earlier Hero turn (the `.btn-emergency`
 * red/danger treatment) — so this is the payoff of that earlier setup
 * rather than a one-off button.
 *
 * Phone number is sourced from src/data/mentalHealth.js (one place to
 * update it; it's also reused in the Contact section), but can be
 * overridden via props if a different number is ever needed for a
 * region-specific deployment.
 *
 * The number itself is spoken out via aria-label so screen reader users
 * hear the actual digits, not just "Emergency Support: Call Now".
 */
export default function EmergencyBanner({
  phoneDisplay = emergencyContact.phoneDisplay,
  phoneHref = emergencyContact.phoneHref,
}) {
  return (
    <div
      className={`glassCard ${styles.emergencyBanner}`}
      role="region"
      aria-label="Emergency mental health support"
    >
      <div className={styles.emergencyText}>
        <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />
        <div>
          <h4>In a crisis right now?</h4>
          <p>You deserve immediate support. Reach out — someone is ready to listen.</p>
        </div>
      </div>

      <Button
        href={phoneHref}
        variant="emergency"
        icon="fa-phone"
        aria-label={`Call emergency support now at ${phoneDisplay}`}
      >
        Emergency Support: Call Now
      </Button>
    </div>
  );
}
