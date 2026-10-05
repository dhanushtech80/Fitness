import React, { useState } from 'react';
import Profile from './Profile';
import DailyActivity from './DailyActivity';
import Workout from './Workout';
import Progress from './Progress';
import '../Dashboard.css';

export default function Dashboard({ user, onLogout }) {
  const [activePage, setActivePage] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(user || {
    name: 'Dhanush B',
    fullName: 'Dhanush B',
    email: 'dhanush80@gmail.com',
    age: 20,
    height: 170,
    heightCm: 170,
    weight: 62,
    weightKg: 62,
    fitnessGoal: 'Stay Fit',
    goal: 'Stay Fit'
  });

  React.useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  const userName = currentUser?.name || currentUser?.fullName || "User";
  const avatarLetter = userName.charAt(0).toUpperCase();

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Time of day greeting logic
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "GOOD MORNING,";
    } else if (hour >= 12 && hour < 17) {
      return "GOOD AFTERNOON,";
    } else if (hour >= 17 && hour < 22) {
      return "GOOD EVENING,";
    } else {
      return "GOOD NIGHT,";
    }
  };

  const handleUpdateUser = (updated) => {
    setCurrentUser(updated);
  };

  return (
    <div className="dashboard-app-container">
      <div className="dashboard-layout">
        {/* SIDEBAR NAVIGATION */}
        <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div>
            <div className="sidebar-header">
              <div className="logo-badge">F</div>
              <div className="logo-text">
                FIT-<span>Track</span>
              </div>
            </div>

            <nav className="sidebar-nav">
              <button
                type="button"
                onClick={() => { setActivePage("overview"); setMobileMenuOpen(false); }}
                className={`nav-item ${activePage === "overview" ? "active" : ""}`}
              >
                <span>📊</span>
                <span>Overview</span>
              </button>

              <button
                type="button"
                onClick={() => { setActivePage("profile"); setMobileMenuOpen(false); }}
                className={`nav-item ${activePage === "profile" ? "active" : ""}`}
              >
                <span>👤</span>
                <span>Profile</span>
              </button>

              <button
                type="button"
                onClick={() => { setActivePage("activity"); setMobileMenuOpen(false); }}
                className={`nav-item ${activePage === "activity" ? "active" : ""}`}
              >
                <span>🏃</span>
                <span>Daily Activity</span>
              </button>

              <button
                type="button"
                onClick={() => { setActivePage("workout"); setMobileMenuOpen(false); }}
                className={`nav-item ${activePage === "workout" ? "active" : ""}`}
              >
                <span>🏋️</span>
                <span>Workout</span>
              </button>

              <button
                type="button"
                onClick={() => { setActivePage("progress"); setMobileMenuOpen(false); }}
                className={`nav-item ${activePage === "progress" ? "active" : ""}`}
              >
                <span>📈</span>
                <span>Progress</span>
              </button>
            </nav>
          </div>

          <div className="sidebar-bottom">
            <div className="slogan-box">
              <div className="slogan-text">
                BETTER<br />
                HEALTH<br />
                BIGGER<br />
                DREAMS
              </div>
            </div>

            <button type="button" onClick={onLogout} className="logout-btn">
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* MAIN BODY AREA */}
        <div className="dashboard-main">
          {/* TOP BAR */}
          <header className="topbar">
            <div className="topbar-left">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="mobile-toggle"
              >
                ☰
              </button>
              <div className="search-box">
                <span>🔍</span>
                <input type="text" placeholder="Search metrics, workouts..." />
              </div>
            </div>

            <div className="topbar-right">
              <button type="button" className="notification-btn" title="Notifications">
                <span>🔔</span>
                <span className="notification-badge"></span>
              </button>

              <div
                className="user-profile-menu"
                onClick={() => setActivePage("profile")}
                title="View Profile"
              >
                <div className="user-avatar">{avatarLetter}</div>
                <span className="user-name-label">{userName}</span>
                <span className="dropdown-icon">⌄</span>
              </div>
            </div>
          </header>

          {/* MAIN CONTENT AREA */}
          <main className="content-area dashboard-main-content">
            {activePage === "overview" && (
              <div>
                {/* HERO BANNER SECTION */}
                <div className="hero-banner">
                  <img src="/hero.jpg" alt="Hero background" className="hero-bg-img" />
                  <div className="hero-overlay"></div>

                  <div className="hero-content">
                    <div className="hero-greeting">{getGreeting()}</div>
                    <h1 className="hero-title">
                      {userName} 👋
                    </h1>
                    <p className="hero-subtitle">
                      Stay consistent, build the healthier and stronger you.
                    </p>
                    <div className="hero-date">
                      <span>📅</span> {formattedDate}
                    </div>
                  </div>

                  <div className="hero-right">
                    <div className="hero-slogan-box">
                      <div className="hero-slogan-title">
                        DISCIPLINE<br />
                        BUILDS<br />
                        FREEDOM
                      </div>
                    </div>
                  </div>
                </div>

                {/* OVERVIEW STATISTICS (4 Cards) */}
                <div className="stats-grid">
                  {/* 1. Steps Card */}
                  <div className="stat-card">
                    <div className="stat-header">
                      <div className="stat-icon green">👟</div>
                      <span className="stat-percentage green">62%</span>
                    </div>
                    <div className="stat-title">Steps</div>
                    <div className="stat-value-group">
                      <span className="stat-value">6,250</span>
                      <span className="stat-target">/ 10,000</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill green" style={{ width: '62%' }}></div>
                    </div>
                  </div>

                  {/* 2. Calories Card */}
                  <div className="stat-card">
                    <div className="stat-header">
                      <div className="stat-icon blue">🔥</div>
                      <span className="stat-percentage blue">53%</span>
                    </div>
                    <div className="stat-title">Calories</div>
                    <div className="stat-value-group">
                      <span className="stat-value">320</span>
                      <span className="stat-target">/ 600 kcal</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill blue" style={{ width: '53%' }}></div>
                    </div>
                  </div>

                  {/* 3. Water Card */}
                  <div className="stat-card">
                    <div className="stat-header">
                      <div className="stat-icon blue">💧</div>
                      <span className="stat-percentage blue">72%</span>
                    </div>
                    <div className="stat-title">Water</div>
                    <div className="stat-value-group">
                      <span className="stat-value">1.8 L</span>
                      <span className="stat-target">/ 2.5 L</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill blue" style={{ width: '72%' }}></div>
                    </div>
                  </div>

                  {/* 4. Workout Card */}
                  <div className="stat-card">
                    <div className="stat-header">
                      <div className="stat-icon purple">🏋️</div>
                      <span className="stat-percentage purple">58%</span>
                    </div>
                    <div className="stat-title">Workout</div>
                    <div className="stat-value-group">
                      <span className="stat-value">35 min</span>
                      <span className="stat-target">/ 60 min</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill purple" style={{ width: '58%' }}></div>
                    </div>
                  </div>
                </div>

                {/* WEEKLY ACTIVITY & WEEKLY GOAL GRID */}
                <div className="dashboard-grid">
                  {/* WEEKLY ACTIVITY CHART */}
                  <div className="card-box">
                    <div className="card-box-header">
                      <h2 className="card-title">
                        <span>📈</span> Weekly Activity
                      </h2>
                      <button
                        type="button"
                        onClick={() => setActivePage("progress")}
                        className="card-action-link"
                      >
                        View Analytics →
                      </button>
                    </div>

                    <div className="chart-container">
                      <div className="chart-bar-group">
                        <div className="chart-bar-wrapper">
                          <div className="chart-bar" style={{ height: '65%' }}></div>
                        </div>
                        <span className="chart-day">Mon</span>
                      </div>
                      <div className="chart-bar-group">
                        <div className="chart-bar-wrapper">
                          <div className="chart-bar" style={{ height: '85%' }}></div>
                        </div>
                        <span className="chart-day">Tue</span>
                      </div>
                      <div className="chart-bar-group">
                        <div className="chart-bar-wrapper">
                          <div className="chart-bar" style={{ height: '50%' }}></div>
                        </div>
                        <span className="chart-day">Wed</span>
                      </div>
                      <div className="chart-bar-group">
                        <div className="chart-bar-wrapper">
                          <div className="chart-bar" style={{ height: '90%' }}></div>
                        </div>
                        <span className="chart-day">Thu</span>
                      </div>
                      <div className="chart-bar-group">
                        <div className="chart-bar-wrapper">
                          <div className="chart-bar" style={{ height: '60%' }}></div>
                        </div>
                        <span className="chart-day">Fri</span>
                      </div>
                      <div className="chart-bar-group">
                        <div className="chart-bar-wrapper">
                          <div className="chart-bar" style={{ height: '100%' }}></div>
                        </div>
                        <span className="chart-day">Sat</span>
                      </div>
                      <div className="chart-bar-group">
                        <div className="chart-bar-wrapper">
                          <div className="chart-bar" style={{ height: '75%' }}></div>
                        </div>
                        <span className="chart-day">Sun</span>
                      </div>
                    </div>
                  </div>

                  {/* WEEKLY GOAL CARD */}
                  <div className="card-box">
                    <div className="card-box-header">
                      <h2 className="card-title">
                        <span>🎯</span> Weekly Goal
                      </h2>
                    </div>

                    <div className="goal-card-content">
                      <div className="circular-progress-container">
                        <svg width="130" height="130" viewBox="0 0 120 120">
                          <circle className="circle-bg" cx="60" cy="60" r="50" />
                          <circle
                            className="circle-progress"
                            cx="60"
                            cy="60"
                            r="50"
                            strokeDasharray="314"
                            strokeDashoffset="88"
                          />
                        </svg>
                        <div className="circle-inner-text">
                          <div className="circle-val">72%</div>
                          <div className="circle-lbl">Completed</div>
                        </div>
                      </div>

                      <div className="goal-breakdown-list">
                        <div className="goal-item">
                          <span className="goal-item-label">Steps</span>
                          <span className="goal-item-val">6,250 / 10,000</span>
                        </div>
                        <div className="goal-item">
                          <span className="goal-item-label">Workout</span>
                          <span className="goal-item-val">35 / 60 min</span>
                        </div>
                        <div className="goal-item">
                          <span className="goal-item-label">Water</span>
                          <span className="goal-item-val">1.8 / 2.5 L</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RECENT ACTIVITY & QUICK ACTIONS */}
                <div className="dashboard-grid">
                  {/* RECENT ACTIVITY */}
                  <div className="card-box">
                    <div className="card-box-header">
                      <h2 className="card-title">
                        <span>⚡</span> Recent Activity
                      </h2>
                    </div>

                    <div className="recent-activity-list">
                      <div className="activity-item">
                        <div className="activity-left">
                          <div className="activity-icon">🚶</div>
                          <div>
                            <div className="activity-title">Walking</div>
                            <div className="activity-meta">30 min • 2.5 km</div>
                          </div>
                        </div>
                        <span className="text-xs text-[#8EA0B7]">Today</span>
                      </div>

                      <div className="activity-item">
                        <div className="activity-left">
                          <div className="activity-icon">💧</div>
                          <div>
                            <div className="activity-title">Water Intake</div>
                            <div className="activity-meta">1.0 L</div>
                          </div>
                        </div>
                        <span className="text-xs text-[#8EA0B7]">Today</span>
                      </div>

                      <div className="activity-item">
                        <div className="activity-left">
                          <div className="activity-icon">🏋️</div>
                          <div>
                            <div className="activity-title">Workout</div>
                            <div className="activity-meta">Chest • Push-ups</div>
                          </div>
                        </div>
                        <span className="text-xs text-[#8EA0B7]">Today</span>
                      </div>

                      <div className="activity-item">
                        <div className="activity-left">
                          <div className="activity-icon">😴</div>
                          <div>
                            <div className="activity-title">Sleep</div>
                            <div className="activity-meta">7 hr 30 min</div>
                          </div>
                        </div>
                        <span className="text-xs text-[#8EA0B7]">Last Night</span>
                      </div>
                    </div>
                  </div>

                  {/* QUICK ACTIONS */}
                  <div className="card-box">
                    <div className="card-box-header">
                      <h2 className="card-title">
                        <span>🚀</span> Quick Actions
                      </h2>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        type="button"
                        onClick={() => setActivePage("activity")}
                        className="action-btn"
                      >
                        Update Activity
                      </button>
                      <button
                        type="button"
                        onClick={() => setActivePage("workout")}
                        className="action-btn"
                      >
                        Log Workout
                      </button>
                      <button
                        type="button"
                        onClick={() => setActivePage("activity")}
                        className="action-btn"
                      >
                        Add Water
                      </button>
                      <button
                        type="button"
                        onClick={() => setActivePage("progress")}
                        className="action-btn"
                      >
                        View Progress
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePage === "profile" && (
              <Profile user={currentUser} onUpdateUser={handleUpdateUser} />
            )}

            {activePage === "activity" && (
              <DailyActivity user={currentUser} />
            )}

            {activePage === "workout" && (
              <Workout user={currentUser} />
            )}

            {activePage === "progress" && (
              <Progress user={currentUser} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
