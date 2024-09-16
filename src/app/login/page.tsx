"use client";  // Ensure this is a client component

import React, { useState } from 'react';
import styles from '@/assets/styles/login.module.css';  // Import CSS module
import PublicRoute from '@/components/publicRoute';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic form validation
    if (!email || !password) {
      setErrorMessage("Both fields are required");
      return;
    }

    // Simulate login logic here
    setErrorMessage("");  // Clear error message
    const fakeUser = { id: 1, name: 'John Doe' };

    dispatch(login(fakeUser));

    // Here, you would typically handle login logic, like calling an API
  };

  return (
    <PublicRoute>
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <h1 className={styles.title}>Login</h1>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit" className={styles.loginButton}>
              Log In
            </button>
          </form>
        </div>
      </div>
    </PublicRoute>
  );
};

export default LoginPage;
