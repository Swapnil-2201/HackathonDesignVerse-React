/**
 * mentalHealth.js
 *
 * Content for the Mental Health Support section (`#mental-health`).
 * `mentalHealthTopics` drives the card grid; `emergencyContact` is
 * shared with EmergencyBanner so the phone number has one source of
 * truth (it's reused in the site's Contact section too).
 */

export const mentalHealthTopics = [
  {
    id: 'stress',
    icon: 'fa-cloud-bolt',
    title: 'Stress',
    tip: 'Try box breathing: 4 seconds in, 4 hold, 4 out, 4 hold. Repeat 5 times.',
  },
  {
    id: 'anxiety',
    icon: 'fa-wind',
    title: 'Anxiety',
    tip: 'Name 5 things you see, 4 you can touch, 3 you hear — it grounds you in the now.',
  },
  {
    id: 'depression',
    icon: 'fa-cloud-rain',
    title: 'Depression',
    tip: 'One small task today is enough. Momentum matters more than magnitude.',
  },
  {
    id: 'burnout',
    icon: 'fa-battery-empty',
    title: 'Burnout',
    tip: "Rest isn't a reward you earn — it's maintenance you need. Schedule it like a meeting.",
  },
];

export const emergencyContact = {
  phoneDisplay: '+91 91529 87821',
  phoneHref: 'tel:+919152987821',
};
