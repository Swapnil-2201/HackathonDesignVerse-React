// src/data/resources.js
//
// Content for the Resource Hub section (`#resources`). Two exports:
//
//   RESOURCES        — six resource card objects, consumed by
//                       ResourceHub.jsx / ResourceCard.jsx. Shape:
//                       { type, icon, title, description, ctaLabel,
//                         emergency, emergencyNumbers? }
//
//   RESOURCE_QUERIES  — maps each `type` to the search-query base string
//                        usePinSearch.js's openResourceSearch(type) uses
//                        to build the Google Maps search URL.
//
// Phone numbers use the India-wide emergency lines (matching the PIN
// code / "India" framing already used elsewhere, e.g. usePinSearch.js's
// default map view and EmergencyBanner's +91 number).

export const RESOURCES = [
  {
    type: 'doctors',
    icon: 'fa-solid fa-user-doctor',
    title: 'General Physicians',
    description: 'Find licensed doctors near you for everyday health concerns.',
    ctaLabel: 'Find Doctors',
    emergency: false,
  },
  {
    type: 'hospitals',
    icon: 'fa-solid fa-hospital',
    title: 'Hospitals',
    description: 'Locate accredited hospitals equipped for urgent and specialist care.',
    ctaLabel: 'Find Hospitals',
    emergency: false,
  },
  {
    type: 'pharmacies',
    icon: 'fa-solid fa-prescription-bottle-medical',
    title: 'Pharmacies',
    description: 'Get prescriptions filled at pharmacies close to your area.',
    ctaLabel: 'Find Pharmacies',
    emergency: false,
  },
  {
    type: 'mentalHealth',
    icon: 'fa-solid fa-comments',
    title: 'Mental Health Counselors',
    description: 'Connect with licensed counselors and therapists nearby.',
    ctaLabel: 'Find Counselors',
    emergency: false,
  },
  {
    type: 'labs',
    icon: 'fa-solid fa-vial',
    title: 'Diagnostic Labs',
    description: 'Book blood work, imaging, and other diagnostic tests locally.',
    ctaLabel: 'Find Labs',
    emergency: false,
  },
  {
    type: 'emergency',
    icon: 'fa-solid fa-truck-medical',
    title: 'Emergency Services',
    description: "If this is urgent, don't wait to search — call for immediate help.",
    ctaLabel: 'Find Emergency Care',
    emergency: true,
    emergencyNumbers: [
      { number: '112', label: 'National Emergency Number' },
      { number: '108', label: 'Ambulance Services' },
    ],
  },
];

export const RESOURCE_QUERIES = {
  doctors: 'general physicians',
  hospitals: 'hospitals',
  pharmacies: 'pharmacies',
  mentalHealth: 'mental health counselors',
  labs: 'diagnostic labs',
  emergency: 'emergency hospitals',
};
