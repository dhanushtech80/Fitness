import React, { useState, useEffect, useRef } from 'react';

// Title reveals exactly when Thor's face is clearly visible (around 10.5-11 seconds in the provided video)
const TITLE_REVEAL_TIME = 10.5;

export default function LandingPage({ setPage, user }) {
  const videoRef = useRef(null);
  const [showTitles, setShowTitles] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setShowTitles(true);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= TITLE_REVEAL_TIME && !showTitles) {
        setShowTitles(true);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [showTitles, prefersReducedMotion]);

  const handleGetStarted = () => {
    if (user) {
      setPage('dashboard');
    } else {
      setPage('login');
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans overflow-x-hidden selection:bg-white selection:text-black">
      {/* Navbar */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 py-5 flex items-center justify-between ${
          scrolled ? 'bg-black/70 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div 
          onClick={() => setPage('landing')}
          className="text-2xl font-black tracking-widest uppercase cursor-pointer hover:opacity-80 transition-opacity"
        >
          FIT TRACK
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300 tracking-wider uppercase">
          <a href="#features" className="hover:text-white transition-colors cursor-pointer">Features</a>
          {!user && (
            <button onClick={() => setPage('login')} className="hover:text-white transition-colors cursor-pointer uppercase">Login</button>
          )}
          <button 
            onClick={handleGetStarted}
            className="px-6 py-2.5 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all transform hover:scale-105 cursor-pointer uppercase"
          >
            Get Started
          </button>
        </div>
        
        {/* Mobile menu toggle */}
        <div className="md:hidden">
            <button 
              onClick={handleGetStarted} 
              className="text-xs px-4 py-2 bg-white text-black rounded-full font-bold uppercase"
            >
              Start
            </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-center items-center">
        {/* Exact Video Background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video (2).mp4" type="video/mp4" />
        </video>
        
        {/* Subtle Dark Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90 z-10 pointer-events-none"></div>
        
        {/* Content Container */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-4 pt-16">
          <div 
            className={`flex flex-col items-center transition-all ease-out duration-[1500ms] ${
              showTitles || prefersReducedMotion ? 'opacity-100 blur-none scale-100 translate-y-0' : 'opacity-0 blur-md scale-105 translate-y-8'
            }`}
          >
            <h1 
              className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tight text-white uppercase mb-4 drop-shadow-2xl"
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.3)' }}
            >
              FIT TRACK
            </h1>
            
            <p 
              className={`text-sm md:text-xl lg:text-2xl font-light tracking-[0.2em] text-gray-200 uppercase mb-12 transition-all ease-out duration-[1500ms] delay-[400ms] ${
                showTitles || prefersReducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Track. Train. Transform.
            </p>
            
            <div 
              className={`transition-all ease-out duration-[1500ms] delay-[800ms] ${
                showTitles || prefersReducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <button
                onClick={handleGetStarted}
                className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
          
          <div 
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-[1000ms] delay-[1500ms] ${
              showTitles || prefersReducedMotion ? 'opacity-60' : 'opacity-0'
            }`}
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 font-semibold text-white">Scroll to explore</span>
            <div className="w-px h-16 bg-gradient-to-b from-white to-transparent opacity-50"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32 px-6 bg-[#050505] relative z-20">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Everything You Need To Stay On Track
            </h2>
            <div className="w-20 md:w-24 h-1 bg-white/20 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* 1 */}
            <div className="bg-[#0f0f0f] border border-[#222] p-8 md:p-10 rounded-3xl hover:border-white/30 transition-all duration-500 group hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-2">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-black border border-[#333] rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                🚶
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-wide">Daily Activity</h3>
              <p className="text-gray-400 font-light leading-relaxed text-base md:text-lg">
                Track daily movement and activity.
              </p>
            </div>
            
            {/* 2 */}
            <div className="bg-[#0f0f0f] border border-[#222] p-8 md:p-10 rounded-3xl hover:border-white/30 transition-all duration-500 group hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-2">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-black border border-[#333] rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                🏋️
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-wide">Workout Tracking</h3>
              <p className="text-gray-400 font-light leading-relaxed text-base md:text-lg">
                Track exercises, sets, reps and workouts.
              </p>
            </div>
            
            {/* 3 */}
            <div className="bg-[#0f0f0f] border border-[#222] p-8 md:p-10 rounded-3xl hover:border-white/30 transition-all duration-500 group hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-2">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-black border border-[#333] rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                🎯
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-wide">Goals</h3>
              <p className="text-gray-400 font-light leading-relaxed text-base md:text-lg">
                Set fitness goals and monitor progress.
              </p>
            </div>
            
            {/* 4 */}
            <div className="bg-[#0f0f0f] border border-[#222] p-8 md:p-10 rounded-3xl hover:border-white/30 transition-all duration-500 group hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-2">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-black border border-[#333] rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                📈
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-wide">Progress Analytics</h3>
              <p className="text-gray-400 font-light leading-relaxed text-base md:text-lg">
                Understand your progress through useful statistics and charts.
              </p>
            </div>
            
            {/* 5 */}
            <div className="bg-[#0f0f0f] border border-[#222] p-8 md:p-10 rounded-3xl hover:border-white/30 transition-all duration-500 group hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-2">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-black border border-[#333] rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                🍎
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-wide">Calories & Nutrition</h3>
              <p className="text-gray-400 font-light leading-relaxed text-base md:text-lg">
                Monitor calories and nutrition progress.
              </p>
            </div>
            
            {/* 6 */}
            <div className="bg-[#0f0f0f] border border-[#222] p-8 md:p-10 rounded-3xl hover:border-white/30 transition-all duration-500 group hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-2">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-black border border-[#333] rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                📱
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-wide">Personal Dashboard</h3>
              <p className="text-gray-400 font-light leading-relaxed text-base md:text-lg">
                View your complete fitness journey in one place.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#020202] py-12 border-t border-[#111] text-center">
        <div className="text-2xl font-black tracking-widest uppercase mb-4 text-white">FIT TRACK</div>
        <p className="text-gray-600 text-sm font-medium tracking-wide">© {new Date().getFullYear()} FIT TRACK. All rights reserved.</p>
      </footer>
    </div>
  );
}

