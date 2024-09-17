// app/page.js (Public route example)
"use client";
import Layout from '@/components/Layout';
import PrivateRoute from '@/components/privateRoute';

export default function HomePage() {
  return (
    <PrivateRoute>
      <Layout>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

          <h1>Home Page - Public</h1>
        </div>
      </Layout>
    </PrivateRoute>
  );
}
