import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Header({ onToggleChat }) {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-surface-container-low/95 backdrop-blur-xl z-40 border-b border-surface-container-high/40 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 w-full px-space-lg flex items-center justify-between gap-space-md">
        {/* Search Input */}
        <div className="flex items-center gap-space-lg flex-1 max-w-lg">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-secondary">
              search
            </span>
            <input
              type="text"
              placeholder="Search athlete metrics, lifts, workouts..."
              className="w-full bg-surface-container pl-10 pr-space-md py-space-xs rounded font-body-sm text-body-sm text-on-surface placeholder:text-secondary focus:outline-none focus:bg-surface-container-high transition-colors"
            />
          </div>
        </div>

        {/* Right Section Actions & User */}
        <div className="flex items-center gap-space-md">
          {/* Streak Indicator */}
          <div className="hidden md:flex items-center gap-space-xs px-space-md py-space-xs rounded bg-surface-container border border-surface-container-high/60">
            <span className="material-symbols-outlined text-primary-container text-lg animate-pulse">
              local_fire_department
            </span>
            <span className="font-label-caps text-label-caps uppercase text-on-surface">
              {user?.streakDays || 14}-Day Streak
            </span>
          </div>

          {/* AI Chat Button */}
          <button
            onClick={onToggleChat}
            className="p-space-xs rounded bg-primary-container/15 text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center gap-1.5 px-3 py-1.5 cursor-pointer"
            title="Open AI Coach Copilot"
          >
            <span className="material-symbols-outlined text-lg">smart_toy</span>
            <span className="font-headline-sm text-headline-sm text-xs uppercase hidden sm:inline">AI Coach</span>
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="p-space-xs rounded bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>

          {/* Profile User Badge */}
          <Link to="/profile" className="flex items-center gap-space-sm pl-space-xs hover:opacity-90 transition-opacity">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name || 'Profile'}
              className="w-8 h-8 rounded-full object-cover border border-primary-container/40"
            />
            <div className="hidden lg:flex flex-col text-left">
              <span className="font-headline-sm text-headline-sm uppercase text-on-surface leading-tight">
                {user?.name || 'Sarah Vance'}
              </span>
              <span className="font-label-mono text-label-mono uppercase text-primary">
                {user?.role || 'Pro Athlete'}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
