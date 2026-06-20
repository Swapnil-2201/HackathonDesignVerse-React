// src/components/ResourceHub/PinSearch.jsx
import styles from './ResourceHub.module.css';

/**
 * Controlled PIN code search form.
 *
 * Props:
 *   draft      {string}   current input value
 *   statusText {string}   line shown below the form
 *   hasResults {boolean}  true once a valid PIN has been committed
 *   onChange   {fn}       called with new string on every keystroke
 *   onSubmit   {fn}       called on form submit (no args)
 */
export default function PinSearch({ draft, statusText, hasResults, onChange, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <div className={`${styles.pinCard} glass-card`}>
      <form className={styles.pinForm} onSubmit={handleSubmit} noValidate>
        <div className={styles.pinField}>
          <i className="fa-solid fa-location-dot" aria-hidden="true" />
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            placeholder="Enter PIN Code"
            aria-label="Enter PIN Code"
            value={draft}
            onChange={(e) => onChange(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true" /> Search
        </button>
      </form>
      <p className={`${styles.pinStatus} ${hasResults ? styles.pinStatusActive : ''}`}>
        {statusText}
      </p>
    </div>
  );
}
