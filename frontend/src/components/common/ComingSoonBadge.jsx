import React from 'react';

export default function ComingSoonBadge({ label = "Sensor Sync Coming Soon" }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-primary-container/20 border border-primary-container/40 text-primary-container text-[11px] font-label-caps uppercase tracking-wider">
      <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
      {label}
    </span>
  );
}
