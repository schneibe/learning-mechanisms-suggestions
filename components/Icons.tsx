
import React from 'react';

const commonProps = {
  className: "h-8 w-8 text-brand-primary",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  strokeWidth: "1.5",
  stroke: "currentColor",
};

export const MechanismIcon: React.FC = () => (
  <svg {...commonProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

export const IdeaIcon: React.FC = () => (
  <svg {...commonProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a15.045 15.045 0 01-6 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const TipsIcon: React.FC = () => (
  <svg {...commonProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.73-.664 1.206-.861a7.5 7.5 0 10-9.28 9.28c.197.476.477.89.861 1.206l3.03-2.496z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L15.17 11.42" />
  </svg>
);

export const TradeoffIcon: React.FC = () => (
  <svg {...commonProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);
