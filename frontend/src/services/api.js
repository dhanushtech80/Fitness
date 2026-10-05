import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach JWT Token if available
api.interceptors.request.use((config) => {
  const userJson = localStorage.getItem('fittrack_user');
  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor for global error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'API request failed';
    console.error('[API Error]', message);
    return Promise.reject(error);
  }
);

// Auth Services
export const authApi = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data)
};

// Workouts Services
export const workoutApi = {
  getAll: () => api.get('/workouts'),
  getById: (id) => api.get(`/workouts/${id}`),
  create: (data) => api.post('/workouts', data),
  update: (id, data) => api.put(`/workouts/${id}`, data),
  delete: (id) => api.delete(`/workouts/${id}`)
};

// Activities Services
export const activityApi = {
  getAll: () => api.get('/activities'),
  create: (data) => api.post('/activities', data),
  delete: (id) => api.delete(`/activities/${id}`)
};

// Nutrition Services
export const nutritionApi = {
  getDaily: (date) => api.get(`/nutrition${date ? `?date=${date}` : ''}`),
  addFood: (data) => api.post('/nutrition', data),
  deleteFood: (id) => api.delete(`/nutrition/${id}`)
};

// Water Services
export const waterApi = {
  getDaily: (date) => api.get(`/water${date ? `?date=${date}` : ''}`),
  addWater: (data) => api.post('/water', data)
};

// Goals Services
export const goalApi = {
  getAll: () => api.get('/goals'),
  create: (data) => api.post('/goals', data),
  update: (id, data) => api.put(`/goals/${id}`, data),
  delete: (id) => api.delete(`/goals/${id}`)
};

// Weight & Body Services
export const weightApi = {
  getAll: () => api.get('/weight'),
  logWeight: (data) => api.post('/weight', data),
  deleteLog: (id) => api.delete(`/weight/${id}`)
};

// Analytics Services
export const analyticsApi = {
  getSummary: () => api.get('/analytics')
};

// AI Services
export const aiApi = {
  sendMessage: (message, context) => api.post('/ai/chat', { message, context }),
  analyzeFood: (foodName, imageUrl) => api.post('/ai/analyze-food', { foodName, imageUrl })
};

export default api;
