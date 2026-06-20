import MentalHealthCard from './MentalHealthCard';
import EmergencyBanner from './EmergencyBanner';
import { mentalHealthTopics } from '../../data/mentalHealth';
import styles from './MentalHealth.module.css';

/**
 * MentalHealth — the "Your mind needs care too" section (`#mental-health`).
 *
 * Renders the four topic cards via map() over mentalHealthTopics, then
 * the EmergencyBanner underneath. Uses the shared global `.section` /
 * `.sectionAlt` / `.sectionHead` / `.sectionSub` / `.eyebrow` classes
 * (src/styles/base.css), matching the legacy markup's
 * `<section class="section section-alt" id="mental-health">` — this is
 * an alternate-background section, same treatment as the Checker and
 * Resources sections.
 */
export default function MentalHealth() {
  return (
    <section className="section sectionAlt" id="mental-health">
      <div className={styles.container}>
        <div className="sectionHead">
          <span className="eyebrow">Mental Health Support</span>
          <h2>Your mind needs care too</h2>
          <p className="sectionSub">
            Mental health is health. Here&apos;s support for what you&apos;re
            carrying, plus a direct line if it&apos;s urgent.
          </p>
        </div>

        <div className={styles.mhGrid}>
          {mentalHealthTopics.map((topic) => (
            <MentalHealthCard
              key={topic.id}
              icon={topic.icon}
              title={topic.title}
              tip={topic.tip}
            />
          ))}
        </div>

        <EmergencyBanner />
      </div>
    </section>
  );
}
