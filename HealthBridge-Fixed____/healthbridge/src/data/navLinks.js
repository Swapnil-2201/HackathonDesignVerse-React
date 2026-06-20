// src/data/navLinks.js
//
// Drives Navbar's primary nav list (`navLinks.map(...)`). Hrefs are
// in-page anchors matching the `id` of each mounted section component.
// The "Take Health Check" CTA is intentionally not in this list — it's
// rendered separately in Navbar.jsx as a styled button, not a plain link.

export const navLinks = [
  { id: 'barriers', href: '#barriers', label: 'Barriers' },
  { id: 'trust', href: '#trust', label: 'Trust' },
  { id: 'mental-health', href: '#mental-health', label: 'Mental Health' },
  { id: 'stories', href: '#stories', label: 'Stories' },
  { id: 'resources', href: '#resources', label: 'Resources' },
];
