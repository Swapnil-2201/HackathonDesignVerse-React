import TrustCard from './TrustCard';
import { trustItems, trustStats } from '../../data/trustData';
import styles from './TrustSection.module.css';

/**
 * TrustSection — the "Why people trust us" credibility section (`#trust`).
 *
 * Two dynamically-rendered groups, both driven by src/data/trustData.js:
 *  - trustItems  -> a grid of <TrustCard> (Verified Doctors, Certified
 *    Hospitals, Community Reviews, Success Stories)
 *  - trustStats  -> the stat row underneath (10,000+ Users Helped, etc.)
 *
 * Uses the shared global `.section` / `.sectionHead` / `.sectionSub` /
 * `.eyebrow` classes (src/styles/base.css) for the section scaffold,
 * same as BarrierSection — these are referenced as plain strings since
 * they're global, unscoped classes, not local CSS Module exports.
 *
 * The stats here are static values, matching the same decision made for
 * HeroStats (the legacy markup has no animated [data-count] counter
 * wired to these particular elements).
 */
export default function TrustSection() {
  return (
    <section className="section" id="trust">
      <div className={styles.container}>
        <div className="sectionHead">
          <span className="eyebrow">Why people trust us</span>
          <h2>Real credentials. Real outcomes.</h2>
        </div>

        <div className={styles.trustGrid}>
          {trustItems.map((item) => (
            <TrustCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        <div className={styles.statsRow}>
          {trustStats.map((stat) => (
            <div className={styles.statBlock} key={stat.id}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
