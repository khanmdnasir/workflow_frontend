import { createSlice } from '@reduxjs/toolkit';

// Define your initial state by checking localStorage
const initialState = {
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
  token: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('token') || 'null') : null,
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token
      state.user = action.payload.user;

      // Save to localStorage
      localStorage.setItem('token', JSON.stringify(state.token));
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null
      state.user = null;

      // Remove from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
