import Button from '../ui/Button/Button';
import HeroStats from './HeroStats';
import styles from './Hero.module.css';

/**
 * Hero — the landing section (`#top`).
 *
 * Ported from the legacy markup: eyebrow badge, gradient-accented headline,
 * subheading, a single primary CTA, the stats row (HeroStats), a hand-built
 * SVG illustration (shield + heartbeat pulse + floating dots), and the
 * bouncing scroll cue anchored to the bottom of the viewport.
 *
 * The illustration is kept inline here rather than split into its own file:
 * it's a one-off decorative graphic used only on this section, not a
 * reusable unit, so a separate HeroIllustration.jsx would just add an
 * import without adding reusability.
 *
 * CTA wiring: the legacy "Get Started" button also carried `.agent-trigger`
 * (opens the AI Symptom Checker modal). AgentContext doesn't expose an
 * openModal() action yet — see the same TODO left in Navbar.jsx — so for
 * now this is a plain anchor to #checker, which is still functionally
 * correct (it scrolls to the right section).
 */
export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.heroGlow} aria-hidden="true" />

      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>
            <i className="fa-solid fa-shield-heart" aria-hidden="true" />
            Trusted by 10,000+ people
          </span>

          <h1 className={styles.heroTitle}>
            Your Health <span className={styles.textGradient}>Can&apos;t Wait</span>
          </h1>

          <p className={styles.heroSub}>
            Breaking the barriers between symptoms and care — with
            judgment-free guidance, real reassurance, and a clear next step.
          </p>

          <div className={styles.heroActions}>
            <Button href="#checker" variant="primary" size="lg" icon="fa-stethoscope">
              Get Started
            </Button>
            {/* TODO: wire to AgentContext.openModal() once it exists,
                matching the legacy .agent-trigger behavior. */}
          </div>

          <HeroStats />
        </div>

        <div className={styles.heroVisual}>
          <svg
            viewBox="0 0 420 420"
            className={styles.heroIllustration}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Illustration of a shield with a heartbeat pulse, representing protected health"
          >
            <defs>
              <radialGradient id="heroGlowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx="210" cy="210" r="190" fill="url(#heroGlowGrad)" />
            <circle
              cx="210"
              cy="210"
              r="150"
              fill="none"
              stroke="#2563EB22"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />

            <path
              className={styles.heroShieldFill}
              d="M210 70 L300 105 V200 C300 270 260 320 210 345 C160 320 120 270 120 200 V105 Z"
              fill="#EEF1F6"
              stroke="#2563EB"
              strokeWidth="2.5"
            />

            <polyline
              points="140,215 175,215 188,180 205,250 220,195 235,215 280,215"
              fill="none"
              stroke="#2563EB"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.pulseLine}
            />

            <circle cx="210" cy="135" r="24" fill="#2563EB" />
            <rect x="202" y="119" width="16" height="32" rx="3" fill="#0a0a0a" />
            <rect x="194" y="127" width="32" height="16" rx="3" fill="#0a0a0a" />

            <circle
              cx="60"
              cy="120"
              r="6"
              fill="#2563EB"
              className={`${styles.floatDot} ${styles.dotA}`}
            />
            <circle
              cx="365"
              cy="160"
              r="8"
              fill="#1D4ED8"
              className={`${styles.floatDot} ${styles.dotB}`}
            />
            <circle
              cx="80"
              cy="320"
              r="5"
              fill="#1D4ED8"
              className={`${styles.floatDot} ${styles.dotC}`}
            />
            <circle
              cx="350"
              cy="330"
              r="7"
              fill="#2563EB"
              className={`${styles.floatDot} ${styles.dotD}`}
            />
          </svg>
        </div>
      </div>

      <a href="#barriers" className={styles.scrollCue} aria-label="Scroll down to learn more">
        <i className="fa-solid fa-chevron-down" aria-hidden="true" />
      </a>
    </section>
  );
}