import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import AIChatbotDrawer from './AIChatbotDrawer';
import DisclaimerBanner from '../common/DisclaimerBanner';

export default function Layout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface font-body-md antialiased flex flex-col">
      {/* Sidebar */}
      <Sidebar onToggleChat={() => setIsChatOpen(prev => !prev)} />

      {/* Top Header */}
      <Header onToggleChat={() => setIsChatOpen(prev => !prev)} />

      {/* Main View Area */}
      <div className="pl-72 flex-1 flex flex-col pt-16">
        <main className="flex-1 bg-surface-container-lowest">
          <Outlet />
        </main>

        {/* Global Medical Disclaimer Banner */}
        <DisclaimerBanner />
      </div>

      {/* Floating AI Chatbot Button (Required on all pages) */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-primary-container text-on-primary-container shadow-[0_0_24px_rgba(225,6,0,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer group"
        aria-label="Open FitTrack AI Assistant"
      >
        <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">
          smart_toy
        </span>
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-surface-container-lowest border-2 border-primary-container flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
        </span>
      </button>

      {/* AI Copilot Drawer */}
      <AIChatbotDrawer 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
}
