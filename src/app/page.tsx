// app/page.js (Public route example)
"use client";
import Layout from '@/components/Layout';
import PublicRoute from '@/components/publicRoute';

export default function HomePage() {
  return (
    <PublicRoute>
      <Layout>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

          <h1>Home Page - Public</h1>
        </div>
      </Layout>
    </PublicRoute>
  );
}
