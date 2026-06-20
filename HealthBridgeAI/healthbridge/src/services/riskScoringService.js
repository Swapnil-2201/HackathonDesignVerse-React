/**
 * riskScoringService.js
 *
 * All scoring logic for the Risk Meter lives here — pure functions, no
 * DOM, no React. Ported from computeRisk() in the original js.js.
 *
 * Note on color: the original resolved the moderate band's color via
 * cssVar('--yellow'), a helper that lives in the Theme toggle block
 * (outside this feature's scope). Referencing the CSS custom property
 * directly as 'var(--yellow)' produces the identical rendered color
 * without that cross-module dependency.
 */

/**
 * @param {number[]} answers - one value (1-4) per question, in order
 * @returns {{ total: number, percentage: number }}
 */
export function computeRiskScore(answers) {
  const total = answers.reduce((sum, value) => sum + value, 0);

  // Original normalized a 5-question, 1-4-per-question quiz (range 5-20)
  // to 0-100. Deriving min/max from answers.length keeps that formula
  // correct if the question count ever changes, while reproducing the
  // exact same 5/20 bounds for the current 5-question quiz.
  const min = answers.length * 1;
  const max = answers.length * 4;
  const percentage = Math.round(((total - min) / (max - min)) * 100);

  return { total, percentage };
}

/**
 * @param {number} percentage - 0-100, from computeRiskScore()
 * @returns {{ level: string, color: string, recommendation: string, motivation: string }}
 */
export function getRiskBand(percentage) {
  if (percentage < 35) {
    return {
      level: 'Low Risk',
      color: '#4ADE80',
      recommendation:
        'You\'re not in dangerous delay territory, but don\'t let "fine for now" become "fine ' +
        'forever." A routine check-up keeps it that way.',
      motivation: '"Staying ahead of small things is how they stay small."',
    };
  }

  if (percentage < 70) {
    return {
      level: 'Moderate Risk',
      color: 'var(--yellow)',
      recommendation:
        'The waiting is starting to cost you peace of mind, if nothing else. Book a consultation ' +
        'in the next 1\u20132 weeks \u2014 it\'s a small step that closes a lot of uncertainty.',
      motivation: '"You don\'t need to be certain something\'s wrong to deserve an answer."',
    };
  }

  return {
    level: 'High Risk',
    color: '#FF5A5F',
    recommendation:
      'The pattern here \u2014 duration, impact, and avoidance \u2014 suggests this has been ' +
      'delayed longer than it should be. Please prioritize seeing a healthcare professional this week.',
    motivation:
      '"Acting now isn\'t panic \u2014 it\'s the version of this story where you\'re glad you ' +
      'didn\'t wait."',
  };
}

/**
 * Composite entry point used by useRiskMeter() once the quiz is complete.
 *
 * @param {number[]} answers
 * @returns {{ total: number, percentage: number, level: string, color: string,
 *             recommendation: string, motivation: string }}
 */
export function computeRiskResult(answers) {
  const { total, percentage } = computeRiskScore(answers);
  const band = getRiskBand(percentage);

  return { total, percentage, ...band };
}
