"use client";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();

  // Ensure the component is only rendered after mounting on the client-side
  useEffect(() => {
    setIsMounted(true);
    if (!isAuthenticated) {
      router.push('/login'); // Redirect if not authenticated
    }
  }, [isAuthenticated, router]);

  if (!isMounted) {
    // While waiting for the client-side rendering, you can return a loading state or nothing
    return null; // or return a loading spinner here
  }

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
