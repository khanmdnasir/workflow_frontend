"use client";  // Ensure this is a client component

import React, { useState } from 'react';
import styles from '@/assets/styles/login.module.css';  // Import CSS module
import PublicRoute from '@/components/publicRoute';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';
import Link from 'next/link';
import { AppDispatch } from '@/store/store';
import axios from '@/store/axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handl e login");
    setLoading(true);
    
    try {
      const response = await axios.post('/api/login/', { "username": username, "password": password }); // Backend login endpoint
      if (response.status !== 200) {
        setError(response?.data?.error);
      }
      else {
        const { token, user } = response.data;
        localStorage.setItem('token', token); // Store the token in localStorage
        dispatch(login({"user": user, "token": token}));
      }
      
    } catch (e) {
      setError((e as Error).message)
    }

    setLoading(false);
  };

  return (
    <PublicRoute>
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <h1 className={styles.title}>Login</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label htmlFor="username">username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ color: 'black'}}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{color: 'black'}}
              />
            </div>
            <button type="submit" className={styles.loginButton} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

        <p>No account? <Link href="/register">Sign In</Link></p>

        </div>
      </div>
    </PublicRoute>
  );
};

export default LoginPage;
