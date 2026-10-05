import React, { useState } from 'react';
import { authApi } from '../services/api';

export default function Login({ setPage, setUser }) {
  const [email, setEmail] = useState('dhanush80@gmail.com');
  const [password, setPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await authApi.login({ email, password });
      const userData = res.data?.user || res.data;
      if (setUser) setUser(userData);
      localStorage.setItem('fittrack_user', JSON.stringify(userData));
      if (setPage) setPage('dashboard');
    } catch (err) {
      // Demo fallback if backend is unavailable or user credentials fail during local test
      if (email === 'dhanush80@gmail.com' || email === 'sarah.vance@fittrack.ai') {
        const demoUser = {
          name: 'Dhanush B',
          fullName: 'Dhanush B',
          email: email,
          age: 20,
          height: 170,
          heightCm: 170,
          weight: 62,
          weightKg: 62,
          fitnessGoal: 'Stay Fit',
          goal: 'Stay Fit',
          token: 'demo_token'
        };
        if (setUser) setUser(demoUser);
        localStorage.setItem('fittrack_user', JSON.stringify(demoUser));
        if (setPage) setPage('dashboard');
      } else {
        setErrorMsg(err.response?.data?.message || 'Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setEmail('dhanush80@gmail.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen w-full bg-[#03070D] text-white flex flex-col justify-center items-center p-6 relative">
      {/* Background hero image blur */}
      <div 
        className="fixed inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,23,68,0.2) 0%, rgba(3,7,13,0.95) 70%), url("/hero.jpg")',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />

      <div className="relative z-10 w-full max-w-md bg-[#071521] border border-[#122738] p-8 rounded-2xl shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#03070D] border border-[#0066FF] flex items-center justify-center font-extrabold text-[#0066FF] text-xl shadow-[0_0_12px_rgba(255,23,68,0.4)]">
            F
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              FIT-Track <span className="text-[#0066FF]">PRO</span>
            </h1>
            <p className="text-xs text-[#8EA0B7] uppercase tracking-wider font-semibold">
              Better Health. Bigger Dreams.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">Welcome Back 👋</h2>
        <p className="text-sm text-[#8EA0B7] mb-6">
          Log in to access your fitness metrics and daily tracking.
        </p>

        {/* Quick Fill Box */}
        <div className="mb-6 p-3 rounded-lg bg-[#0A1A27] border border-[#122738] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0066FF] text-white font-bold text-xs flex items-center justify-center">
              D
            </div>
            <div>
              <div className="text-xs font-bold text-white">Dhanush B (Demo User)</div>
              <div className="text-[11px] text-[#8EA0B7]">dhanush80@gmail.com</div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickFill}
            className="text-xs text-[#0066FF] font-bold hover:underline cursor-pointer"
          >
            Quick Fill
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-blue-950/60 border border-blue-500/40 text-blue-400 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#8EA0B7] uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dhanush80@gmail.com"
              className="w-full px-4 py-3 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm focus:outline-none focus:border-[#0066FF] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8EA0B7] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#03070D] border border-[#122738] rounded-lg text-white text-sm focus:outline-none focus:border-[#0066FF] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#0066FF] hover:bg-[#D50000] text-white font-bold rounded-lg text-sm uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(255,23,68,0.4)] cursor-pointer mt-2"
          >
            {loading ? 'AUTHENTICATING...' : 'LOGIN TO DASHBOARD'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-[#122738] text-center text-xs text-[#8EA0B7]">
          Don't have an account?{' '}
          <button
            onClick={() => setPage && setPage('register')}
            className="text-[#0066FF] font-bold hover:underline cursor-pointer ml-1"
          >
            Register Here
          </button>
        </div>
      </div>
    </div>
  );
}
