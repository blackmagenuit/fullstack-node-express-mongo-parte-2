import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.params) {
    Object.keys(config.params).forEach((key) => {
      if (config.params[key] === undefined || config.params[key] === null || config.params[key] === '') {
        delete config.params[key];
      }
    });
  }
  return config;
});

export const loginUser = async ({ email, password }) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const registerUser = async ({ name, email, password, role }) => {
  const { data } = await api.post('/auth/register', { name, email, password, role });
  return data;
};

export const fetchUsers = async (params = {}) => {
  const { data } = await api.get('/users', { params });
  return data;
};

export const fetchWordPressPosts = async () => {
  const { data } = await api.get('/wordpress/posts');
  return data.posts || [];
};

export default api;
