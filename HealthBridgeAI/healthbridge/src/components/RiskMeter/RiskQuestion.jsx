/**
 * RiskQuestion.jsx
 *
 * Renders one question with its options. Replaces the original's
 * innerHTML-templated `.risk-q` block plus its querySelectorAll/click
 * wiring in renderRiskQuestions().
 *
 * One deliberate improvement over the source: options are real <button>
 * elements with role="radio"/aria-checked instead of plain non-focusable
 * <div data-q>, so the quiz is keyboard-operable. Visual behavior
 * (highlight the selected option, deselect its siblings) is unchanged.
 */

import styles from './RiskMeter.module.css';

export function RiskQuestion({ question, selectedValue, onSelect }) {
  return (
    <div className={styles.riskQ}>
      <h4 className={styles.riskQTitle}>{question.prompt}</h4>
      <div
        className={styles.riskOptions}
        role="radiogroup"
        aria-label={question.prompt}
      >
        {question.options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`${styles.riskOption} ${isSelected ? styles.selected : ''}`.trim()}
              onClick={() => onSelect(option.value)}
            >
              <span className={styles.optDot} aria-hidden="true" />
              <span>{option.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
