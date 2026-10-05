import React, { useState, useEffect, useRef } from 'react';
import { aiApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import DisclaimerBanner from '../common/DisclaimerBanner';

export default function AIChatbotDrawer({ isOpen, onClose }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello ${user?.name || 'Athlete'}! Your CNS recovery score is 88% primed today. You have 550 kcal and 38g protein remaining to hit your hypertrophy floor. What can we optimize today?`,
      time: '10:14 AM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [sending, setSending] = useState(false);
  const streamRef = useRef(null);

  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || sending) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setSending(true);

    try {
      const res = await aiApi.sendMessage(query, `User: ${user?.name}, Streak: ${user?.streakDays || 14} days`);
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: res.data.reply,
        actionableTip: res.data.actionableTip,
        disclaimer: res.data.disclaimer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const fallbackMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `FitTrack AI Coach: Telemetry analyzing "${query}". Maintain target macro distribution of 140g protein and execute progressive overload for today's session.`,
        actionableTip: "Consistently track set volume and rest intervals for peak myofibrillar output.",
        disclaimer: "All nutrition/health outputs are estimates, not medical advice.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setSending(false);
    }
  };

  const quickPrompts = [
    "How many calories left today?",
    "Suggest a high-protein dinner",
    "Plan my workout",
    "Explain my weight trend"
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 top-16 left-0 lg:left-72 bg-surface-container-lowest/80 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside 
        aria-label="FitTrack AI Assistant"
        className="fixed top-16 right-0 bottom-0 w-full max-w-[480px] bg-surface-container-lowest shadow-[-16px_0_36px_rgba(0,0,0,0.85)] z-50 flex flex-col justify-between border-l-2 border-primary-container"
      >
        {/* Header */}
        <header className="flex flex-col bg-surface-container-low shrink-0">
          <div className="bg-primary-container px-space-md py-1 flex items-center justify-between">
            <div className="flex items-center gap-space-xs text-on-primary-container">
              <span className="w-1.5 h-1.5 rounded-full bg-on-primary-container animate-ping"></span>
              <span className="font-label-mono text-label-mono font-bold tracking-widest uppercase">FitTrack AI // Neural Engine v4.2</span>
            </div>
            <span className="font-label-mono text-label-mono text-on-primary-container/80 uppercase font-semibold">Ultra-Low Latency</span>
          </div>

          <div className="p-space-md flex items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-9 h-9 rounded bg-primary-container/15 flex items-center justify-center text-primary-container shrink-0">
                <span className="material-symbols-outlined text-xl">smart_toy</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-space-xs">
                  <span className="font-headline-sm text-headline-sm uppercase tracking-wide text-on-surface truncate">FITTRACK AI COACH</span>
                  <span className="px-1.5 py-0.5 rounded bg-primary-container text-on-primary-container font-label-mono text-label-mono uppercase">Live</span>
                </div>
                <span className="font-label-mono text-label-mono uppercase text-secondary truncate">Real-time Biometric Copilot</span>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-8 h-8 rounded bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <div className="px-space-md pb-space-sm">
            <div className="w-full bg-surface-container px-space-sm py-space-xs rounded flex items-center justify-between gap-space-xs overflow-x-auto text-nowrap">
              <span className="font-label-caps text-label-caps uppercase text-primary font-bold">{user?.name || 'ATHLETE'}</span>
              <span className="text-secondary/30">•</span>
              <span className="font-label-caps text-label-caps uppercase text-secondary">HRV: <strong className="text-on-surface font-semibold">82MS</strong></span>
              <span className="text-secondary/30">•</span>
              <span className="font-label-caps text-label-caps uppercase text-secondary">CALORIES: <strong className="text-primary-container font-semibold">1,650 / 2,200</strong></span>
            </div>
          </div>
        </header>

        {/* Chat Stream */}
        <div ref={streamRef} className="flex-1 overflow-y-auto px-space-md py-space-md flex flex-col gap-space-md scroll-smooth">
          <div className="flex items-center justify-center">
            <span className="px-space-sm py-0.5 rounded bg-surface-container font-label-mono text-label-mono text-outline uppercase tracking-wider">
              Today • Realtime Chat Log
            </span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.sender === 'user' ? (
                <div className="flex items-start justify-end gap-space-sm max-w-[85%] ml-auto my-2">
                  <div className="flex flex-col items-end gap-1 min-w-0">
                    <div className="bg-primary-container text-on-primary-container p-space-md rounded-xl rounded-tr-none shadow-md">
                      <p className="font-body-md text-body-md font-semibold text-on-primary-container">
                        {msg.text}
                      </p>
                    </div>
                    <span className="font-label-mono text-label-mono text-secondary px-space-xs">{msg.time}</span>
                  </div>
                  <div className="w-7 h-7 rounded bg-surface-container-high text-on-surface flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-base">person</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-space-sm max-w-[94%] my-2">
                  <div className="w-7 h-7 rounded bg-surface-container-high text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-base">neurology</span>
                  </div>
                  <div className="flex flex-col gap-1 min-w-0 w-full">
                    <div className="bg-surface-container-low p-space-md rounded-xl rounded-tl-none shadow-sm flex flex-col gap-space-xs">
                      <span className="font-label-mono text-label-mono text-primary font-bold uppercase tracking-wider">FitTrack Core Intelligence</span>
                      <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                        {msg.text}
                      </p>
                      {msg.actionableTip && (
                        <div className="mt-2 p-2 rounded bg-surface-container border border-surface-container-high text-xs text-primary font-label-mono">
                          💪 Tip: {msg.actionableTip}
                        </div>
                      )}
                      <div className="mt-1 text-[10px] text-secondary font-label-mono opacity-80">
                        ⚠️ Disclaimer: All nutrition & health outputs are estimates, not medical advice.
                      </div>
                    </div>
                    <span className="font-label-mono text-label-mono text-secondary px-space-xs">{msg.time}</span>
                  </div>
                </div>
              )}
            </div>
          ))}

          {sending && (
            <div className="flex items-center gap-2 text-primary text-xs font-label-mono animate-pulse">
              <span className="material-symbols-outlined text-base">sync</span>
              <span>Processing telemetry query...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestions & Input */}
        <div className="p-space-md bg-surface-container-low border-t border-surface-container-high flex flex-col gap-space-sm">
          <div className="flex flex-wrap gap-space-xs">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-space-sm py-1 rounded bg-surface-container hover:bg-surface-container-high text-secondary hover:text-on-surface font-label-caps text-label-caps uppercase text-left transition-all text-xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask AI Coach about nutrition, workouts, recovery..."
              className="flex-1 bg-surface-container border border-surface-container-high px-3 py-2 rounded text-sm text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary-container"
            />
            <button
              type="submit"
              disabled={sending || !inputMessage.trim()}
              className="px-4 py-2 bg-primary-container hover:brightness-110 disabled:opacity-50 text-on-primary-container rounded font-headline-sm text-headline-sm uppercase transition-all"
            >
              Send
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
