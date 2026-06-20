import BarrierCard from './BarrierCard';
import { barriers } from '../../data/barriers';
import styles from './BarrierSection.module.css';

/**
 * BarrierSection — "What's Standing Between You and Care?" (`#barriers`).
 *
 * Renders the six barrier cards via map() over src/data/barriers.js,
 * same data-driven pattern as TrustSection/MentalHealth/Stories. Uses
 * the shared global `.section` / `.sectionHead` / `.sectionSub` /
 * `.eyebrow` classes (src/styles/base.css) for the section scaffold,
 * matching the camelCase global-class convention already established
 * in MentalHealth.jsx and Stories.jsx.
 *
 * This is a plain (non-alt-background) section, same treatment as
 * Trust and Stories — Mental Health is currently the only section
 * using the `.sectionAlt` background variant.
 */
export default function BarrierSection() {
  return (
    <section className="section" id="barriers">
      <div className={styles.container}>
        <div className="sectionHead">
          <span className="eyebrow">The Barriers</span>
          <h2>What&apos;s Standing Between You and Care?</h2>
          <p className="sectionSub">
            These are the real reasons people delay seeking help — recognizing
            them is the first step to not letting them win.
          </p>
        </div>

        <div className={styles.barrierGrid}>
          {barriers.map((barrier) => (
            <BarrierCard
              key={barrier.id}
              icon={barrier.icon}
              title={barrier.title}
              description={barrier.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
