"use-client";
import Layout from '@/components/Layout';
import PrivateRoute from '@/components/privateRoute';

export default function DashboardPage() {

  return (
    <PrivateRoute>
      <Layout>
        <div>
        <h1>Dashboard - Private</h1>
        </div>
      </Layout>
    </PrivateRoute>
  );
}
