import React, { useState } from 'react';

export default function DailyActivity({ user }) {
  const [activityData, setActivityData] = useState({
    steps: 6250,
    targetSteps: 10000,
    distance: 4.8,
    calories: 320,
    activeMinutes: 45,
    waterLiters: 1.8,
    targetWaterLiters: 2.5
  });

  const [addSteps, setAddSteps] = useState('');
  const [addWater, setAddWater] = useState('');
  const [activityType, setActivityType] = useState('Walking');
  const [duration, setDuration] = useState('');
  const [msg, setMsg] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    let updatedSteps = activityData.steps;
    let updatedWater = activityData.waterLiters;
    let updatedCalories = activityData.calories;
    let updatedMinutes = activityData.activeMinutes;

    if (addSteps) {
      updatedSteps += Number(addSteps);
      updatedCalories += Math.round(Number(addSteps) * 0.04);
    }
    if (addWater) {
      updatedWater = parseFloat((updatedWater + Number(addWater)).toFixed(1));
    }
    if (duration) {
      updatedMinutes += Number(duration);
      updatedCalories += Number(duration) * 6;
    }

    setActivityData({
      ...activityData,
      steps: updatedSteps,
      waterLiters: updatedWater,
      calories: updatedCalories,
      activeMinutes: updatedMinutes,
      distance: parseFloat((updatedSteps * 0.00078).toFixed(1))
    });

    setAddSteps('');
    setAddWater('');
    setDuration('');
    setMsg('Activity logged successfully!');
    setTimeout(() => setMsg(''), 3000);
  };

  const stepPercent = Math.min(100, Math.round((activityData.steps / activityData.targetSteps) * 100));
  const waterPercent = Math.min(100, Math.round((activityData.waterLiters / activityData.targetWaterLiters) * 100));

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-wide uppercase">DAILY ACTIVITY</h1>
        <p className="text-sm text-[#8EA0B7] mt-1">
          Monitor your real-time daily movement, hydration, and active burn metrics.
        </p>
      </div>

      {msg && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold rounded-lg">
          {msg}
        </div>
      )}

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Steps */}
        <div className="bg-[#071521] border border-[#122738] p-5 rounded-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8EA0B7]">Steps</span>
            <span className="text-xs font-bold">{stepPercent}%</span>
          </div>
          <div className="text-2xl font-extrabold text-white">{activityData.steps.toLocaleString()}</div>
          <div className="text-xs text-[#8EA0B7]">Target: {activityData.targetSteps.toLocaleString()}</div>
          <div className="w-full bg-[#0A1A27] h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full" style={{ width: `${stepPercent}%` }}></div>
          </div>
        </div>

        {/* Distance */}
        <div className="bg-[#071521] border border-[#122738] p-5 rounded-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-blue-400">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8EA0B7]">Distance</span>
            <span className="text-xs font-bold">Km</span>
          </div>
          <div className="text-2xl font-extrabold text-white">{activityData.distance} km</div>
          <div className="text-xs text-[#8EA0B7]">Est. 1,280 steps/km</div>
          <div className="w-full bg-[#0A1A27] h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-400 h-full" style={{ width: `${Math.min(100, (activityData.distance / 10) * 100)}%` }}></div>
          </div>
        </div>

        {/* Calories Burned */}
        <div className="bg-[#071521] border border-[#122738] p-5 rounded-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-[#0066FF]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8EA0B7]">Calories</span>
            <span className="text-xs font-bold">Burned</span>
          </div>
          <div className="text-2xl font-extrabold text-white">{activityData.calories} kcal</div>
          <div className="text-xs text-[#8EA0B7]">Target: 600 kcal</div>
          <div className="w-full bg-[#0A1A27] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#0066FF] h-full" style={{ width: `${Math.min(100, (activityData.calories / 600) * 100)}%` }}></div>
          </div>
        </div>

        {/* Active Minutes */}
        <div className="bg-[#071521] border border-[#122738] p-5 rounded-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-purple-400">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8EA0B7]">Active Time</span>
            <span className="text-xs font-bold">Minutes</span>
          </div>
          <div className="text-2xl font-extrabold text-white">{activityData.activeMinutes} min</div>
          <div className="text-xs text-[#8EA0B7]">Goal: 60 min</div>
          <div className="w-full bg-[#0A1A27] h-1.5 rounded-full overflow-hidden">
            <div className="bg-purple-400 h-full" style={{ width: `${Math.min(100, (activityData.activeMinutes / 60) * 100)}%` }}></div>
          </div>
        </div>

        {/* Water Intake */}
        <div className="bg-[#071521] border border-[#122738] p-5 rounded-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-cyan-400">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8EA0B7]">Water</span>
            <span className="text-xs font-bold">{waterPercent}%</span>
          </div>
          <div className="text-2xl font-extrabold text-white">{activityData.waterLiters} L</div>
          <div className="text-xs text-[#8EA0B7]">Goal: {activityData.targetWaterLiters} L</div>
          <div className="w-full bg-[#0A1A27] h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-400 h-full" style={{ width: `${waterPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* Update Activity Section */}
      <div className="bg-[#071521] border border-[#122738] p-6 rounded-2xl">
        <h2 className="text-lg font-bold text-white mb-2">Update Today's Activity</h2>
        <p className="text-xs text-[#8EA0B7] mb-6">
          Log additional steps, workout duration, or hydration to keep your stats synchronized.
        </p>

        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#8EA0B7] uppercase mb-1">
              Activity Type
            </label>
            <select
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm"
            >
              <option value="Walking">Walking</option>
              <option value="Running">Running</option>
              <option value="Cycling">Cycling</option>
              <option value="Swimming">Swimming</option>
              <option value="Gym Workout">Gym Workout</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8EA0B7] uppercase mb-1">
              Add Steps
            </label>
            <input
              type="number"
              value={addSteps}
              onChange={(e) => setAddSteps(e.target.value)}
              placeholder="e.g. 1500"
              className="w-full px-3 py-2.5 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8EA0B7] uppercase mb-1">
              Add Water (Liters)
            </label>
            <input
              type="number"
              step="0.1"
              value={addWater}
              onChange={(e) => setAddWater(e.target.value)}
              placeholder="e.g. 0.5"
              className="w-full px-3 py-2.5 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8EA0B7] uppercase mb-1">
              Duration (mins)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 30"
              className="w-full px-3 py-2.5 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm"
            />
          </div>

          <div className="md:col-span-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#0066FF] hover:bg-[#D50000] text-white font-bold rounded-lg text-sm uppercase tracking-wider transition-all shadow-[0_4px_14px_rgba(255,23,68,0.4)] cursor-pointer"
            >
              Update Activity Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
