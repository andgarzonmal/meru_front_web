"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Asegúrate de estar importando desde 'next/navigation'
import { useAuth } from '@/context/Authcontext';

const LogoutPage = () => {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      router.push('/login');
    };
    performLogout();
  }, [logout, router]);

  return <p>Logging out...</p>;
};

export default LogoutPage;
