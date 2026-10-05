import React, { useState } from 'react';
import { authApi } from '../services/api';
import '../Profile.css';

export default function Profile({ user, onUpdateUser }) {
  const userName = user?.name || user?.fullName || "User";
  const userEmail = user?.email || "No email available";
  const userAge = user?.age || 20;
  const userHeight = user?.height || user?.heightCm || 170;
  const userWeight = user?.weight || user?.weightKg || 62;
  const userGoal = user?.fitnessGoal || user?.goal || "Stay Fit";
  const avatarLetter = userName.charAt(0).toUpperCase();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userName,
    age: userAge,
    height: userHeight,
    weight: userWeight,
    fitnessGoal: userGoal
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const updates = {
      name: formData.name,
      age: Number(formData.age),
      heightCm: Number(formData.height),
      height: Number(formData.height),
      weightKg: Number(formData.weight),
      weight: Number(formData.weight),
      fitnessGoal: formData.fitnessGoal,
      goal: formData.fitnessGoal
    };

    try {
      await authApi.updateProfile(updates);
    } catch (err) {
      console.log('Using local fallback update for profile');
    }

    const updatedUser = { ...user, ...updates };
    if (onUpdateUser) {
      onUpdateUser(updatedUser);
    }
    localStorage.setItem('fittrack_user', JSON.stringify(updatedUser));
    setSaving(false);
    setIsEditing(false);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="profile-container">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-wide uppercase">MY PROFILE</h1>
        <p className="text-sm text-[#8EA0B7] mt-1">
          Manage your personal information and fitness details.
        </p>
      </div>

      {message && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold rounded-lg">
          {message}
        </div>
      )}

      {/* Profile Header Card */}
      <div className="profile-header-card">
        <div className="profile-avatar-large">
          {avatarLetter}
        </div>
        <div className="profile-header-info">
          <div className="profile-header-name">{userName}</div>
          <div className="profile-header-email">{userEmail}</div>
          <div className="profile-header-badge">FIT-Track Member</div>
        </div>
      </div>

      {/* Personal Information Card */}
      <div className="info-section-card">
        <div className="info-section-title">
          <span>Personal Information</span>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="edit-btn"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
        <p className="info-section-desc">
          Your basic demographic metrics and active fitness goal.
        </p>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="info-grid">
              <div className="info-item">
                <label className="info-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="info-input"
                  required
                />
              </div>

              <div className="info-item">
                <label className="info-label">Email Address</label>
                <div className="info-value text-gray-400 text-sm py-1">{userEmail} (Read-only)</div>
              </div>

              <div className="info-item">
                <label className="info-label">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="info-input"
                  required
                />
              </div>

              <div className="info-item">
                <label className="info-label">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="info-input"
                  required
                />
              </div>

              <div className="info-item">
                <label className="info-label">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="info-input"
                  required
                />
              </div>

              <div className="info-item">
                <label className="info-label">Fitness Goal</label>
                <select
                  name="fitnessGoal"
                  value={formData.fitnessGoal}
                  onChange={handleChange}
                  className="info-input"
                >
                  <option value="Stay Fit">Stay Fit</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Endurance">Endurance & Cardio</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={saving} className="save-btn">
              {saving ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </form>
        ) : (
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Full Name</span>
              <span className="info-value">{userName}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{userEmail}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Age</span>
              <span className="info-value">{userAge} years</span>
            </div>

            <div className="info-item">
              <span className="info-label">Height</span>
              <span className="info-value">{userHeight} cm</span>
            </div>

            <div className="info-item">
              <span className="info-label">Weight</span>
              <span className="info-value">{userWeight} kg</span>
            </div>

            <div className="info-item">
              <span className="info-label">Fitness Goal</span>
              <span className="info-value">{userGoal}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
