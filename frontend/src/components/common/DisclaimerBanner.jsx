import React from 'react';

export default function DisclaimerBanner({ compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container border border-surface-container-high text-xs text-secondary">
        <span className="material-symbols-outlined text-sm text-primary-container">info</span>
        <span>Disclaimer: All nutrition & health outputs are estimates, not medical advice.</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-surface-container-low border-t border-surface-container-high py-2.5 px-4 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs text-secondary font-label-mono uppercase tracking-wider">
        <span className="material-symbols-outlined text-sm text-primary">info</span>
        <span>Notice: All nutrition, macro estimations, metabolic rates, and health recommendations provided by FitTrack AI are estimates for informational tracking only and do not constitute professional medical advice.</span>
      </div>
    </div>
  );
}
