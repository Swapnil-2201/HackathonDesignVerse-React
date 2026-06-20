
import { useToast } from '../../hooks/useToast';
import { usePinSearch } from '../../hooks/usePinSearch';
import { RESOURCES } from '../../data/resources';
import PinSearch from './PinSearch';
import GoogleMap from './GoogleMap';
import ResourceCard from './ResourceCard';
import styles from './ResourceHub.module.css';


export default function ResourceHub() {
  const { showToast } = useToast();

  const {
    draft,
    setDraft,
    mapSrc,
    hasResults,
    statusText,
    submitPin,
    openResourceSearch,
  } = usePinSearch();

  function handlePinSubmit() {
    const valid = submitPin();
    if (!valid) {
      showToast('Please enter a valid 6-digit PIN code');
    }
  }

  return (
    <section className="section section-alt" id="resources">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Resource Hub</span>
          <h2>Nearby Healthcare, Just a PIN Code Away</h2>
          <p className="section-sub">
            Enter your area PIN code to find doctors, hospitals, and emergency support around you.
          </p>
        </div>

        <PinSearch
          draft={draft}
          statusText={statusText}
          hasResults={hasResults}
          onChange={setDraft}
          onSubmit={handlePinSubmit}
        />

        <GoogleMap src={mapSrc} hasResults={hasResults} />

        <div className={styles.resourceGrid}>
          {RESOURCES.map((resource) => (
            <ResourceCard
              key={resource.type}
              resource={resource}
              onFind={openResourceSearch}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
