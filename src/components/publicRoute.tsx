// src/components/PublicRoute.js
"use client"
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { RootState } from '@/store/store';

interface PublicRouteProps {
    children: ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard'); // Redirect to dashboard or home if logged in
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? null : children;
};

export default PublicRoute;
