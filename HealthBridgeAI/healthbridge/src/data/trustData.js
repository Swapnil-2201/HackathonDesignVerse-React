/**
 * trustData.js
 *
 * Content for the Trust Builder section, extracted from the legacy
 * markup (`#trust` — "Why people trust us" / "Real credentials. Real
 * outcomes."). Two separate arrays because they render as two distinct
 * groups in TrustSection: a card grid and a stats row.
 */

export const trustItems = [
  {
    id: 'verified-doctors',
    icon: 'fa-user-doctor',
    title: 'Verified Doctors',
    description: 'Every profile is license-checked before it ever reaches you.',
  },
  {
    id: 'certified-hospitals',
    icon: 'fa-hospital',
    title: 'Certified Hospitals',
    description: 'Partner facilities meet recognized accreditation standards.',
  },
  {
    id: 'community-reviews',
    icon: 'fa-comments',
    title: 'Community Reviews',
    description: "Honest, unfiltered feedback from people who've been there.",
  },
  {
    id: 'success-stories',
    icon: 'fa-trophy',
    title: 'Success Stories',
    description: 'Thousands of early-action stories that ended well.',
  },
];

export const trustStats = [
  { id: 'users', value: '10,000+', label: 'Users Helped' },
  { id: 'experts', value: '500+', label: 'Healthcare Experts' },
  { id: 'satisfaction', value: '95%', label: 'User Satisfaction' },
];
