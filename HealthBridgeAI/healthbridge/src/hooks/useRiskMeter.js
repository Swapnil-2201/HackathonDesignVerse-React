/**
 * useRiskMeter.js
 *
 * Section-local state only (plain useState — no Context, no useReducer).
 * Mirrors the original's module-scoped currentQ / answers variables and
 * the renderRiskQuestions() / updateRiskNav() / goToQuestion() /
 * computeRisk() functions, translated into React state + derived values.
 *
 * Behavior preserved from the original:
 * - Forward-only navigation. The original never implements a "back" step,
 *   so this hook doesn't invent one.
 * - goNext() is a no-op if the current question has no answer selected
 *   yet (mirrors `if (answers[currentQ] === null) return;`).
 * - Reaching "complete" doesn't reset currentQuestionIndex — the last
 *   question stays the active one underneath the result, exactly as the
 *   original leaves the last `.risk-q.active` question visible above
 *   `riskOutput` once `.show` is added.
 */

import { useCallback, useMemo, useState } from 'react';
import { computeRiskResult } from '../services/riskScoringService';

export function useRiskMeter(questions) {
  const totalQuestions = questions.length;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(() => new Array(totalQuestions).fill(null));
  const [isComplete, setIsComplete] = useState(false);

  const selectAnswer = useCallback(
    (value) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[currentQuestionIndex] = value;
        return next;
      });
    },
    [currentQuestionIndex]
  );

  const goNext = useCallback(() => {
    if (answers[currentQuestionIndex] === null) return; // matches original's early return

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((index) => index + 1);
    } else {
      setIsComplete(true);
    }
  }, [answers, currentQuestionIndex, totalQuestions]);

  const reset = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers(new Array(totalQuestions).fill(null));
    setIsComplete(false);
  }, [totalQuestions]);

  const result = useMemo(
    () => (isComplete ? computeRiskResult(answers) : null),
    [isComplete, answers]
  );

  const progressPercent = isComplete
    ? 100
    : ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const isNextDisabled = answers[currentQuestionIndex] === null;

  return {
    questions,
    currentQuestion: questions[currentQuestionIndex],
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
  };
}
