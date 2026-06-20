

import { useRiskMeter } from '../../hooks/useRiskMeter';
import { riskQuestions } from '../../data/riskQuestions';
import { RiskQuestion } from './RiskQuestion';
import { RiskResult } from './RiskResult';
import styles from './RiskMeter.module.css';

export function RiskMeter() {
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    answers,
    isComplete,
    result,
    progressPercent,
    isNextDisabled,
    selectAnswer,
    goNext,
    reset,
  } = useRiskMeter(riskQuestions);

  return (
    <div className={styles.riskMeter}>
      <div className={styles.riskNav}>
        <span className={styles.riskQCount}>
          {isComplete
            ? 'Assessment complete'
            : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
        </span>
        <div className={styles.riskProgressTrack}>
          <div
            className={styles.riskProgressBar}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <RiskQuestion
        question={currentQuestion}
        selectedValue={answers[currentQuestionIndex]}
        onSelect={selectAnswer}
      />

      {!isComplete && (
        <button
          type="button"
          className={styles.riskNextBtn}
          onClick={goNext}
          disabled={isNextDisabled}
        >
          {currentQuestionIndex === totalQuestions - 1 ? (
            <>
              See My Result <i className="fa-solid fa-flag-checkered" aria-hidden="true" />
            </>
          ) : (
            <>
              Next <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </>
          )}
        </button>
      )}

      {isComplete && result && (
        <>
          <RiskResult result={result} />
          <button type="button" className={styles.riskRetakeBtn} onClick={reset}>
            <i className="fa-solid fa-rotate-right" aria-hidden="true" /> Retake assessment
          </button>
        </>
      )}
    </div>
  );
}
