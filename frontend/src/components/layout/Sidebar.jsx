import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ onToggleChat }) {
  const { user } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { label: 'Pro Dashboard', path: '/pro-dashboard', icon: 'dataset' },
    { label: 'Activity', path: '/activity', icon: 'directions_run' },
    { label: 'Nutrition', path: '/nutrition', icon: 'restaurant' },
    { label: 'Macros', path: '/nutrition-macros', icon: 'pie_chart' },
    { label: 'Food Scanner', path: '/food-analysis', icon: 'photo_camera' },
    { label: 'Workouts', path: '/workouts', icon: 'fitness_center' },
    { label: 'Workout Studio', path: '/workout-studio', icon: 'exercise' },
    { label: 'Weight', path: '/weight', icon: 'monitor_weight' },
    { label: 'Weight Setup', path: '/weight-setup', icon: 'tune' },
    { label: 'Water', path: '/water', icon: 'water_drop' },
    { label: 'Goals', path: '/goals', icon: 'flag' },
    { label: 'Analytics', path: '/analytics', icon: 'insights' },
    { label: 'Profile', path: '/profile', icon: 'person' }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-surface-container-high/40">
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Brand Header */}
        <div className="px-space-lg py-space-md flex items-center gap-space-sm border-b border-surface-container-high/30">
          <div className="w-9 h-9 rounded bg-primary-container flex items-center justify-center text-on-primary-container font-bold font-display-hero text-xl shadow-md">
            F
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm uppercase text-on-surface tracking-wider">FitTrack AI</span>
            <span className="font-label-mono text-[10px] uppercase text-outline">Better Health. Smarter Tracking.</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="px-space-md py-space-xs mt-2">
          <span className="px-space-sm font-label-caps text-label-caps uppercase text-secondary">Telemetry & Logs</span>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 px-space-md py-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-space-md px-space-md py-2 rounded transition-colors ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-headline-sm text-headline-sm uppercase shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`
              }
            >
              <span className="material-symbols-outlined text-inherit text-xl">{item.icon}</span>
              <span className="font-headline-sm text-headline-sm uppercase tracking-wide text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* AI Copilot Trigger Button */}
        <div className="px-space-md my-3">
          <button
            onClick={onToggleChat}
            className="w-full flex items-center justify-between px-space-md py-2.5 rounded bg-primary-container/20 border border-primary-container/50 hover:bg-primary-container hover:text-on-primary-container text-primary transition-all group"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">smart_toy</span>
              <span className="font-headline-sm text-headline-sm uppercase text-xs">AI Copilot</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-primary-container group-hover:bg-on-primary-container animate-ping"></span>
          </button>
        </div>

        {/* Footer System Status */}
        <div className="p-space-md mt-auto border-t border-surface-container-high/30">
          <div className="bg-surface-container p-space-sm rounded flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-label-caps text-label-caps uppercase text-on-surface text-xs">System Ready</span>
            </div>
            <span className="font-label-mono text-label-mono uppercase text-secondary text-[10px]">V4.2</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
