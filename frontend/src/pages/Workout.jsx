import React, { useState } from 'react';

export default function Workout({ user }) {
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      title: 'Chest & Triceps Workout',
      category: 'Hypertrophy',
      duration: '45 min',
      calories: 380,
      exercises: [
        { name: 'Push-ups', sets: 3, reps: 12 },
        { name: 'Bench Press', sets: 3, reps: 10 },
        { name: 'Shoulder Press', sets: 3, reps: 10 }
      ]
    },
    {
      id: 2,
      title: 'Lower Body & Core',
      category: 'Strength',
      duration: '50 min',
      calories: 420,
      exercises: [
        { name: 'Barbell Squats', sets: 4, reps: 10 },
        { name: 'Romanian Deadlifts', sets: 3, reps: 12 },
        { name: 'Hanging Leg Raises', sets: 3, reps: 15 }
      ]
    }
  ]);

  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [exName, setExName] = useState('');
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('10');
  const [msg, setMsg] = useState('');

  const handleAddWorkout = (e) => {
    e.preventDefault();
    if (!title) return;

    const newW = {
      id: Date.now(),
      title,
      category: 'General Strength',
      duration: (duration || '35') + ' min',
      calories: Number(calories) || 300,
      exercises: [
        { name: exName || 'Push-ups', sets: Number(sets) || 3, reps: Number(reps) || 12 }
      ]
    };

    setWorkouts([newW, ...workouts]);
    setTitle('');
    setDuration('');
    setCalories('');
    setExName('');
    setMsg('Workout logged successfully!');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-wide uppercase">WORKOUT TRACKER</h1>
        <p className="text-sm text-[#8EA0B7] mt-1">
          Record workouts, track exercises, sets, reps, and calories burned.
        </p>
      </div>

      {msg && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold rounded-lg">
          {msg}
        </div>
      )}

      {/* Log Workout Form */}
      <div className="bg-[#071521] border border-[#122738] p-6 rounded-2xl">
        <h2 className="text-lg font-bold text-white mb-2">Log New Workout</h2>
        <form onSubmit={handleAddWorkout} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#8EA0B7] uppercase mb-1">Workout Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Chest Workout"
              className="w-full px-3 py-2.5 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8EA0B7] uppercase mb-1">Duration (min)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 45"
              className="w-full px-3 py-2.5 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8EA0B7] uppercase mb-1">Calories Burned</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="e.g. 350"
              className="w-full px-3 py-2.5 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8EA0B7] uppercase mb-1">Exercise Name</label>
            <input
              type="text"
              value={exName}
              onChange={(e) => setExName(e.target.value)}
              placeholder="Push-ups"
              className="w-full px-3 py-2.5 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8EA0B7] uppercase mb-1">Sets</label>
            <input
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              placeholder="3"
              className="w-full px-3 py-2.5 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8EA0B7] uppercase mb-1">Reps</label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              placeholder="12"
              className="w-full px-3 py-2.5 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm"
            />
          </div>

          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#0066FF] hover:bg-[#D50000] text-white font-bold rounded-lg text-sm uppercase tracking-wider transition-all shadow-[0_4px_14px_rgba(255,23,68,0.4)] cursor-pointer"
            >
              + Log Workout Session
            </button>
          </div>
        </form>
      </div>

      {/* Workout Sessions List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider">Logged Workouts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workouts.map((w) => (
            <div key={w.id} className="bg-[#071521] border border-[#122738] p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/40 text-[10px] font-extrabold uppercase rounded-full tracking-wider">
                    {w.category}
                  </span>
                  <span className="text-xs text-[#8EA0B7] font-semibold">{w.duration} • {w.calories} kcal</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{w.title}</h3>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#8EA0B7] uppercase tracking-wider mb-1">Exercises</div>
                  {w.exercises.map((ex, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-[#0A1A27] rounded-lg border border-[#122738]">
                      <span className="text-sm font-semibold text-white">{ex.name}</span>
                      <span className="text-xs font-bold text-[#0066FF]">
                        {ex.sets} sets × {ex.reps} reps
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
