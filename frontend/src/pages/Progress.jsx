import React from 'react';

export default function Progress({ user }) {
  const userWeight = user?.weight || user?.weightKg || 62;
  const userGoal = user?.fitnessGoal || user?.goal || "Stay Fit";

  const progressMetrics = [
    { title: 'Weekly Average Steps', current: '7,850', target: '10,000 / day', percent: 78, color: '#00E676' },
    { title: 'Calories Burned (7 days)', current: '2,840 kcal', target: '4,200 kcal', percent: 67, color: '#0066FF' },
    { title: 'Workout Minutes Logged', current: '210 min', target: '300 min', percent: 70, color: '#AB47BC' },
    { title: 'Water Intake Consistency', current: '13.5 L', target: '17.5 L', percent: 77, color: '#29B6F6' }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-wide uppercase">PROGRESS & ANALYTICS</h1>
        <p className="text-sm text-[#8EA0B7] mt-1">
          Comprehensive performance evaluation and historical goal completion metrics.
        </p>
      </div>

      {/* Goal Summary Header Card */}
      <div className="bg-[#071521] border border-[#122738] p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-xs font-extrabold text-[#0066FF] uppercase tracking-wider">Active Target</div>
          <h2 className="text-2xl font-bold text-white">Fitness Goal: {userGoal}</h2>
          <p className="text-xs text-[#8EA0B7]">
            Current Weight: <span className="text-white font-bold">{userWeight} kg</span> • Target Weight: <span className="text-white font-bold">60 kg</span>
          </p>
        </div>

        <div className="flex items-center gap-6 bg-[#0A1A27] px-6 py-4 rounded-xl border border-[#122738]">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-[#0066FF]">84%</div>
            <div className="text-[10px] font-bold text-[#8EA0B7] uppercase tracking-wider">Goal Completion</div>
          </div>
          <div className="h-10 w-px bg-[#122738]"></div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-emerald-400">14 Days</div>
            <div className="text-[10px] font-bold text-[#8EA0B7] uppercase tracking-wider">Active Streak</div>
          </div>
        </div>
      </div>

      {/* Metrics Progress Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {progressMetrics.map((m, idx) => (
          <div key={idx} className="bg-[#071521] border border-[#122738] p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">{m.title}</span>
              <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-[#0A1A27] border border-[#122738]" style={{ color: m.color }}>
                {m.percent}%
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-white">{m.current}</span>
              <span className="text-xs text-[#8EA0B7]">Target: {m.target}</span>
            </div>

            <div className="w-full bg-[#0A1A27] h-2 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${m.percent}%`, backgroundColor: m.color }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Weight Progress Section */}
      <div className="bg-[#071521] border border-[#122738] p-6 rounded-2xl space-y-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">Weight & Body Composition Trend</h3>
        <p className="text-xs text-[#8EA0B7]">
          Tracking weight progress over recent weeks.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center pt-2">
          <div className="p-4 bg-[#0A1A27] rounded-xl border border-[#122738]">
            <div className="text-xs text-[#8EA0B7] font-semibold">Starting</div>
            <div className="text-xl font-bold text-white mt-1">65.0 kg</div>
          </div>
          <div className="p-4 bg-[#0A1A27] rounded-xl border border-[#122738]">
            <div className="text-xs text-[#8EA0B7] font-semibold">Current</div>
            <div className="text-xl font-bold text-[#0066FF] mt-1">{userWeight} kg</div>
          </div>
          <div className="p-4 bg-[#0A1A27] rounded-xl border border-[#122738]">
            <div className="text-xs text-[#8EA0B7] font-semibold">Target</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">60.0 kg</div>
          </div>
          <div className="p-4 bg-[#0A1A27] rounded-xl border border-[#122738]">
            <div className="text-xs text-[#8EA0B7] font-semibold">Total Change</div>
            <div className="text-xl font-bold text-blue-400 mt-1">-3.0 kg</div>
          </div>
        </div>
      </div>
    </div>
  );
}
