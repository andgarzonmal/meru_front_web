"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/Authcontext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token === null) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setIsLoading(false);  // Token found in localStorage, stop loading
      } else {
        router.push('/login');
      }
    } else {
      setIsLoading(false);  // Token is present in context, stop loading
    }
  }, [token, router]);

  if (isLoading) {
    return <p>Loading...</p>;  // You can customize this loading state
  }

  return <>{children}</>;
};

export default ProtectedRoute;
