import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  workoutApi, 
  activityApi, 
  nutritionApi, 
  waterApi, 
  goalApi, 
  weightApi, 
  analyticsApi 
} from '../services/api';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  
  const [workouts, setWorkouts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [nutrition, setNutrition] = useState({
    totals: { calories: 1650, protein: 92, carbs: 185, fat: 44 },
    foodLogs: [
      { _id: 'f1', foodName: 'Oatmeal with Whey Protein & Blueberries', mealType: 'Breakfast', calories: 520, proteinGrams: 42, carbsGrams: 68, fatGrams: 10, time: '08:30 AM' },
      { _id: 'f2', foodName: 'Grilled Salmon Bowl with Quinoa & Asparagus', mealType: 'Lunch', calories: 580, proteinGrams: 46, carbsGrams: 42, fatGrams: 22, time: '01:00 PM' },
      { _id: 'f3', foodName: 'Chicken Breast & Sweet Potato Prep', mealType: 'Dinner', calories: 550, proteinGrams: 50, carbsGrams: 55, fatGrams: 12, time: '07:00 PM' }
    ]
  });
  const [water, setWater] = useState({
    totalMl: 2600,
    targetMl: 3500,
    percentage: 74,
    logs: [
      { _id: 'w1', amountMl: 750, time: '08:00 AM' },
      { _id: 'w2', amountMl: 1000, time: '11:30 AM' },
      { _id: 'w3', amountMl: 850, time: '03:15 PM' }
    ]
  });
  const [goals, setGoals] = useState([
    { _id: 'g1', title: 'Target Bodyweight 70.0 kg', category: 'Weight', currentValue: 72.5, targetValue: 70.0, unit: 'kg', deadline: '2026-11-30', status: 'Active', icon: 'monitor_weight' },
    { _id: 'g2', title: 'Deadlift PR 150 kg', category: 'Workout', currentValue: 130, targetValue: 150, unit: 'kg', deadline: '2026-12-15', status: 'Active', icon: 'fitness_center' },
    { _id: 'g3', title: '30-Day Workout Consistency Streak', category: 'Streak', currentValue: 14, targetValue: 30, unit: 'days', deadline: '2026-10-31', status: 'Active', icon: 'local_fire_department' }
  ]);
  const [weightLogs, setWeightLogs] = useState([
    { _id: 'wt1', weightKg: 72.5, bodyFatPercentage: 16.8, muscleMassKg: 58.2, date: '2026-10-01', notes: 'Morning weigh in post-hydrate' },
    { _id: 'wt2', weightKg: 72.8, bodyFatPercentage: 17.0, muscleMassKg: 58.0, date: '2026-09-30', notes: 'Rest day check' },
    { _id: 'wt3', weightKg: 73.1, bodyFatPercentage: 17.2, muscleMassKg: 57.9, date: '2026-09-29', notes: 'Initial mesocycle start' }
  ]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAllData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [wRes, aRes, nRes, wtRes, gRes, wgtRes, anaRes] = await Promise.allSettled([
        workoutApi.getAll(),
        activityApi.getAll(),
        nutritionApi.getDaily(),
        waterApi.getDaily(),
        goalApi.getAll(),
        weightApi.getAll(),
        analyticsApi.getSummary()
      ]);

      if (wRes.status === 'fulfilled' && wRes.value.data?.length) setWorkouts(wRes.value.data);
      if (aRes.status === 'fulfilled' && aRes.value.data?.length) setActivities(aRes.value.data);
      if (nRes.status === 'fulfilled' && nRes.value.data) setNutrition(nRes.value.data);
      if (wtRes.status === 'fulfilled' && wtRes.value.data) setWater(wtRes.value.data);
      if (gRes.status === 'fulfilled' && gRes.value.data?.length) setGoals(gRes.value.data);
      if (wgtRes.status === 'fulfilled' && wgtRes.value.data?.length) setWeightLogs(wgtRes.value.data);
      if (anaRes.status === 'fulfilled' && anaRes.value.data) setAnalytics(anaRes.value.data);
    } catch (err) {
      console.warn('API sync warning - using active state:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [user]);

  // Actions
  const addWorkout = async (data) => {
    try {
      const res = await workoutApi.create(data);
      setWorkouts(prev => [res.data, ...prev]);
      return res.data;
    } catch (err) {
      const fallback = { _id: Date.now().toString(), ...data, date: new Date().toISOString().split('T')[0] };
      setWorkouts(prev => [fallback, ...prev]);
      return fallback;
    }
  };

  const addActivity = async (data) => {
    try {
      const res = await activityApi.create(data);
      setActivities(prev => [res.data, ...prev]);
      return res.data;
    } catch (err) {
      const fallback = { _id: Date.now().toString(), ...data, date: new Date().toISOString().split('T')[0] };
      setActivities(prev => [fallback, ...prev]);
      return fallback;
    }
  };

  const addFoodLog = async (data) => {
    try {
      const res = await nutritionApi.addFood(data);
      setNutrition(prev => {
        const newLogs = [res.data, ...(prev.foodLogs || [])];
        const newTotals = newLogs.reduce((acc, item) => ({
          calories: acc.calories + (item.calories || 0),
          protein: acc.protein + (item.proteinGrams || 0),
          carbs: acc.carbs + (item.carbsGrams || 0),
          fat: acc.fat + (item.fatGrams || 0)
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
        return { ...prev, totals: newTotals, foodLogs: newLogs };
      });
      return res.data;
    } catch (err) {
      const fallback = { _id: Date.now().toString(), ...data, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setNutrition(prev => {
        const newLogs = [fallback, ...(prev.foodLogs || [])];
        const newTotals = newLogs.reduce((acc, item) => ({
          calories: acc.calories + (item.calories || 0),
          protein: acc.protein + (item.proteinGrams || 0),
          carbs: acc.carbs + (item.carbsGrams || 0),
          fat: acc.fat + (item.fatGrams || 0)
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
        return { ...prev, totals: newTotals, foodLogs: newLogs };
      });
      return fallback;
    }
  };

  const addWaterLog = async (amountMl) => {
    try {
      const res = await waterApi.addWater({ amountMl });
      setWater(prev => {
        const newTotal = (prev.totalMl || 0) + amountMl;
        const target = prev.targetMl || 3500;
        return {
          ...prev,
          totalMl: newTotal,
          percentage: Math.min(100, Math.round((newTotal / target) * 100)),
          logs: [{ _id: Date.now().toString(), amountMl, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...(prev.logs || [])]
        };
      });
    } catch (err) {
      setWater(prev => {
        const newTotal = (prev.totalMl || 0) + amountMl;
        const target = prev.targetMl || 3500;
        return {
          ...prev,
          totalMl: newTotal,
          percentage: Math.min(100, Math.round((newTotal / target) * 100)),
          logs: [{ _id: Date.now().toString(), amountMl, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...(prev.logs || [])]
        };
      });
    }
  };

  const addGoal = async (data) => {
    try {
      const res = await goalApi.create(data);
      setGoals(prev => [res.data, ...prev]);
    } catch (err) {
      const fallback = { _id: Date.now().toString(), ...data, status: 'Active' };
      setGoals(prev => [fallback, ...prev]);
    }
  };

  const addWeightLog = async (data) => {
    try {
      const res = await weightApi.logWeight(data);
      setWeightLogs(prev => [res.data, ...prev]);
    } catch (err) {
      const fallback = { _id: Date.now().toString(), ...data, date: new Date().toISOString().split('T')[0] };
      setWeightLogs(prev => [fallback, ...prev]);
    }
  };

  return (
    <DataContext.Provider value={{
      workouts,
      activities,
      nutrition,
      water,
      goals,
      weightLogs,
      analytics,
      loading,
      refreshData: fetchAllData,
      addWorkout,
      addActivity,
      addFoodLog,
      addWaterLog,
      addGoal,
      addWeightLog
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
