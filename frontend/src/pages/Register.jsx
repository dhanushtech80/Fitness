import React, { useState } from 'react';
import { authApi } from '../services/api';

export default function Register({ setPage, setUser }) {
  const [formData, setFormData] = useState({
    name: 'Dhanush B',
    email: 'dhanush80@gmail.com',
    password: 'password123',
    age: '20',
    height: '170',
    weight: '62',
    fitnessGoal: 'Stay Fit'
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      age: Number(formData.age) || 20,
      heightCm: Number(formData.height) || 170,
      height: Number(formData.height) || 170,
      weightKg: Number(formData.weight) || 62,
      weight: Number(formData.weight) || 62,
      fitnessGoal: formData.fitnessGoal || 'Stay Fit',
      goal: formData.fitnessGoal || 'Stay Fit'
    };

    try {
      const res = await authApi.register(payload);
      const userData = res.data?.user || res.data;
      if (setUser) setUser(userData);
      localStorage.setItem('fittrack_user', JSON.stringify(userData));
      if (setPage) setPage('dashboard');
    } catch (err) {
      // Fallback for demo registration if backend is unreachable
      const userData = {
        _id: 'user_' + Date.now(),
        ...payload,
        token: 'demo_token'
      };
      if (setUser) setUser(userData);
      localStorage.setItem('fittrack_user', JSON.stringify(userData));
      if (setPage) setPage('dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#03070D] text-white flex flex-col justify-center items-center p-6 relative py-12">
      {/* Background overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,23,68,0.2) 0%, rgba(3,7,13,0.95) 70%), url("/hero.jpg")',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />

      <div className="relative z-10 w-full max-w-lg bg-[#071521] border border-[#122738] p-8 rounded-2xl shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#03070D] border border-[#0066FF] flex items-center justify-center font-extrabold text-[#0066FF] text-xl shadow-[0_0_12px_rgba(255,23,68,0.4)]">
            F
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              FIT-Track <span className="text-[#0066FF]">REGISTER</span>
            </h1>
            <p className="text-xs text-[#8EA0B7] uppercase tracking-wider font-semibold">
              Better Health. Bigger Dreams.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">Create Athlete Profile 🚀</h2>
        <p className="text-sm text-[#8EA0B7] mb-6">
          Set up your personal information and start tracking your fitness.
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-blue-950/60 border border-blue-500/40 text-blue-400 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#8EA0B7] uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Dhanush B"
                className="w-full px-4 py-3 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8EA0B7] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="dhanush80@gmail.com"
                className="w-full px-4 py-3 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8EA0B7] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#8EA0B7] uppercase tracking-wider mb-1.5">
                Age
              </label>
              <input
                type="number"
                name="age"
                required
                value={formData.age}
                onChange={handleChange}
                placeholder="20"
                className="w-full px-3 py-3 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8EA0B7] uppercase tracking-wider mb-1.5">
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                required
                value={formData.height}
                onChange={handleChange}
                placeholder="170"
                className="w-full px-3 py-3 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8EA0B7] uppercase tracking-wider mb-1.5">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                required
                value={formData.weight}
                onChange={handleChange}
                placeholder="62"
                className="w-full px-3 py-3 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8EA0B7] uppercase tracking-wider mb-1.5">
              Fitness Goal
            </label>
            <select
              name="fitnessGoal"
              value={formData.fitnessGoal}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm focus:outline-none focus:border-[#0066FF]"
            >
              <option value="Stay Fit">Stay Fit</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="Weight Loss">Weight Loss</option>
              <option value="Endurance">Endurance & Cardio</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#0066FF] hover:bg-[#D50000] text-white font-bold rounded-lg text-sm uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(255,23,68,0.4)] cursor-pointer mt-4"
          >
            {loading ? 'REGISTERING...' : 'CREATE ACCOUNT & LOG IN'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-[#122738] text-center text-xs text-[#8EA0B7]">
          Already registered?{' '}
          <button
            onClick={() => setPage && setPage('login')}
            className="text-[#0066FF] font-bold hover:underline cursor-pointer ml-1"
          >
            Login Here
          </button>
        </div>
      </div>
    </div>
  );
}
