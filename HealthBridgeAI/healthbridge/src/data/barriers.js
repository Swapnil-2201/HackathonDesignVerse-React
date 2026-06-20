// src/data/barriers.js
//
// Content for the Barrier section (`#barriers`) — "What's Standing
// Between You and Care?" — six common reasons people delay seeking
// medical or mental healthcare. Same { id, icon, title, description }
// shape as trustData.js's `trustItems`, so BarrierCard can reuse the
// identical card-rendering pattern.

export const barriers = [
  {
    id: 'cost',
    icon: 'fa-coins',
    title: 'Cost & Insurance',
    description: 'Worrying about the bill before you even know what is wrong.',
  },
  {
    id: 'time',
    icon: 'fa-clock',
    title: 'Time Constraints',
    description: "Work, family, and commutes leave little room for a clinic visit.",
  },
  {
    id: 'fear',
    icon: 'fa-face-flushed',
    title: 'Fear & Anxiety',
    description: "Sometimes not knowing feels safer than finding out — it isn't.",
  },
  {
    id: 'distance',
    icon: 'fa-route',
    title: 'Distance to Care',
    description: 'Quality care can feel out of reach when the nearest facility is far away.',
  },
  {
    id: 'stigma',
    icon: 'fa-user-shield',
    title: 'Stigma',
    description: "Fear of judgment keeps people quiet about symptoms that need attention.",
  },
  {
    id: 'awareness',
    icon: 'fa-circle-question',
    title: 'Lack of Awareness',
    description: "Not knowing where to start is its own barrier to getting help.",
  },
];
