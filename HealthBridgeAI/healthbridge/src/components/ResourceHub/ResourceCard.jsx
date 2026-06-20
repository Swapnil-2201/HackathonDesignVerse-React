// src/components/ResourceHub/ResourceCard.jsx
import styles from './ResourceHub.module.css';

/**
 * Single resource card. Handles both standard and emergency variants.
 *
 * Props:
 *   resource {object} — one entry from RESOURCES in src/data/resources.js
 *     { type, icon, title, description, ctaLabel, emergency, emergencyNumbers? }
 *   onFind   {fn(type)} — called when the CTA button is clicked
 */
export default function ResourceCard({ resource, onFind }) {
  const {
    type,
    icon,
    title,
    description,
    ctaLabel,
    emergency,
    emergencyNumbers,
  } = resource;

  return (
    <div
      className={`glass-card ${styles.resourceCard} ${emergency ? styles.resourceCardEmergency : ''}`}
    >
      <div className={`${styles.resourceIcon} ${emergency ? styles.resourceIconEmergency : ''}`}>
        <i className={icon} aria-hidden="true" />
      </div>

      <h3 className={styles.resourceTitle}>{title}</h3>
      <p className={styles.resourceDesc}>{description}</p>

      {emergency && emergencyNumbers && (
        <div className={styles.emergencyNumbers}>
          {emergencyNumbers.map(({ number, label }) => (
            <a
              key={number}
              href={`tel:${number}`}
              className={styles.emergencyNumber}
            >
              <strong>{number}</strong>
              <span>{label}</span>
            </a>
          ))}
        </div>
      )}

      <button
        type="button"
        className={styles.resourceCta}
        onClick={() => onFind(type)}
      >
        <i className="fa-solid fa-magnifying-glass-location" aria-hidden="true" />
        {' '}{ctaLabel}
      </button>
    </div>
  );
}
