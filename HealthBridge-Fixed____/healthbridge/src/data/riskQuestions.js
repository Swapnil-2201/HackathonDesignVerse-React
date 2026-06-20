// src/data/riskQuestions.js
//
// The 5-question Risk Meter quiz, consumed by useRiskMeter() via
// RiskMeter.jsx. Each option's `value` is 1-4; riskScoringService.js's
// computeRiskScore() sums these across all 5 questions (range 5-20)
// and normalizes to a 0-100 percentage, so every question here must
// have exactly 4 options valued 1 through 4.
//
// Theme matches the scoring copy in riskScoringService.js (delay,
// avoidance, impact) — each question probes one dimension of "how long
// has this been put off, and how is it affecting you."

export const riskQuestions = [
  {
    id: 'duration',
    prompt: 'How long have you been experiencing this symptom or concern?',
    options: [
      { value: 1, text: 'Less than a week' },
      { value: 2, text: '1–4 weeks' },
      { value: 3, text: '1–3 months' },
      { value: 4, text: 'More than 3 months' },
    ],
  },
  {
    id: 'impact',
    prompt: 'How much is it affecting your daily life?',
    options: [
      { value: 1, text: 'Not at all' },
      { value: 2, text: 'Slightly' },
      { value: 3, text: 'Moderately' },
      { value: 4, text: 'Significantly' },
    ],
  },
  {
    id: 'avoidance',
    prompt: 'Have you been avoiding seeing a doctor about it?',
    options: [
      { value: 1, text: 'No, I see doctors regularly' },
      { value: 2, text: "I've thought about it but haven't put it off" },
      { value: 3, text: "I've been putting it off" },
      { value: 4, text: 'Yes, I actively avoid it' },
    ],
  },
  {
    id: 'trend',
    prompt: 'Is it getting better, staying the same, or getting worse?',
    options: [
      { value: 1, text: 'Getting better' },
      { value: 2, text: 'Staying about the same' },
      { value: 3, text: 'Slowly getting worse' },
      { value: 4, text: 'Rapidly getting worse' },
    ],
  },
  {
    id: 'support',
    prompt: 'Do you have someone you can talk to or get support from about this?',
    options: [
      { value: 1, text: 'Yes, multiple people' },
      { value: 2, text: 'Yes, one person' },
      { value: 3, text: 'Not really' },
      { value: 4, text: "No, I'm dealing with this alone" },
    ],
  },
];
