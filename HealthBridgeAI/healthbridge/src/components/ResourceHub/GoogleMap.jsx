// src/components/ResourceHub/GoogleMap.jsx
import styles from './ResourceHub.module.css';

/**
 * Renders the embedded Google Maps iframe.
 * The `src` is derived by usePinSearch and passed in as a prop —
 * this component owns no state of its own.
 *
 * Props:
 *   src        {string}  iframe src (memoized by usePinSearch)
 *   hasResults {boolean} hides the empty-state overlay once true
 */
export default function GoogleMap({ src, hasResults }) {
  return (
    <div className={`${styles.mapCard} ${hasResults ? styles.mapCardHasResults : ''} glass-card`}>
      <div className={styles.mapWrap}>
        <iframe
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          title="Nearby healthcare facilities map"
          className={styles.mapFrame}
        />
        {!hasResults && (
          <div className={styles.mapEmpty} aria-hidden="true">
            <i className="fa-solid fa-map-location-dot" />
            <p>Your nearby hospitals will appear here once you search a PIN code.</p>
          </div>
        )}
      </div>
    </div>
  );
}
