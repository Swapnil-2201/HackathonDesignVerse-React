// src/components/Hero/HeroStats.jsx
import styles from './Hero.module.css';

/**
 * HeroStats — the small stat row under the Hero copy/CTA.
 *
 * Hero.module.css already ships `.heroStats` / `.heroStat` /
 * `.heroStat strong` / `.heroStat span` rules with a comment noting
 * they're "consumed by HeroStats.jsx" — this component renders that
 * exact `<strong>` (value) + `<span>` (label) structure.
 *
 * Stats are static text here (matching TrustSection's stats row,
 * which the legacy markup also renders as static — no animated
 * [data-count] counter is wired to either). The numbers mirror the
 * ones already used in the Hero eyebrow ("Trusted by 10,000+ people")
 * and TrustSection's stats (10,000+ / 500+ / 95%) for consistency
 * across the page.
 */
const heroStats = [
  { id: 'people', value: '10,000+', label: 'People Helped' },
  { id: 'doctors', value: '500+', label: 'Verified Doctors' },
  { id: 'satisfaction', value: '95%', label: 'Satisfaction Rate' },
];

export default function HeroStats() {
  return (
    <div className={styles.heroStats}>
      {heroStats.map((stat) => (
        <div className={styles.heroStat} key={stat.id}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
