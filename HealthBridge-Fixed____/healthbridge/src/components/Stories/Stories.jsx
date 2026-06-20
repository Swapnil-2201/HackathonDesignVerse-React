import StoryCard from './StoryCard';
import { stories } from '../../data/stories';
import styles from './Stories.module.css';

/**
 * Stories — the "Real people. Real relief." section (`#stories`).
 *
 * Renders the testimonial grid via map() over src/data/stories.js.
 * Uses the shared global `.section` / `.sectionHead` / `.eyebrow`
 * classes (src/styles/base.css), matching the legacy
 * `<section class="section" id="stories">` — a plain (non-alt)
 * section, same treatment as Trust.
 */
export default function Stories() {
  return (
    <section className="section" id="stories">
      <div className={styles.container}>
        <div className="sectionHead">
          <span className="eyebrow">Community Stories</span>
          <h2>Real people. Real relief.</h2>
        </div>

        <div className={styles.storiesGrid}>
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              quote={story.quote}
              avatarInitial={story.avatarInitial}
              name={story.name}
              context={story.context}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
