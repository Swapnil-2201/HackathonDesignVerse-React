import styles from './Stories.module.css';

/**
 * StoryCard — one testimonial card.
 *
 * Purely presentational and data-driven (quote, avatar initial, name,
 * context in; markup out), same shape as TrustCard / MentalHealthCard.
 * Reuses the global `.glassCard` utility class (src/styles/base.css)
 * for the glass surface — referenced as a plain string, not via the
 * local `styles` object, since it's defined outside this CSS module.
 *
 * `avatarInitial` is rendered as a generated initial badge rather than
 * a photo, matching the legacy markup's anonymized-testimonial design
 * (no real headshots, consistent with the "Anonymous" framing).
 */
export default function StoryCard({ quote, avatarInitial, name, context }) {
  return (
    <div className={`glassCard ${styles.storyCard}`}>
      <i className={`fa-solid fa-quote-left ${styles.quoteIcon}`} aria-hidden="true" />
      <p className={styles.storyQuote}>{quote}</p>
      <div className={styles.storyMeta}>
        <span className={styles.storyAvatar} aria-hidden="true">
          {avatarInitial}
        </span>
        <div>
          <strong>{name}</strong>
          <small>{context}</small>
        </div>
      </div>
    </div>
  );
}
