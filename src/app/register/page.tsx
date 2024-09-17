"use client";  // Ensure this is a client component

import React, { useState } from 'react';
import styles from '@/assets/styles/login.module.css';  // Import CSS module
import PublicRoute from '@/components/publicRoute';
import Link from 'next/link';
import axios from '@/store/axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setLoading(true);
    
    try {
      const response = await axios.post('/api/register/', { "username": username, "email": email, "password": password }); // Backend login endpoint
      console.log("response", response);
      setSuccess("User created succesfully!");
    } catch (e) {
      setError((e as Error).message);
    }

    setLoading(false);
  };

  return (
    <PublicRoute>
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <h1 className={styles.title}>Register</h1>
          {success && <p className={styles.success}>{success}</p>}
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ color: 'black'}}
              />
            </div>
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
            <button type="submit" className={styles.loginButton} disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

        <p>Already have an account? <Link href="/login">Login</Link></p>

        </div>
      </div>
    </PublicRoute>
  );
};

export default RegisterPage;
