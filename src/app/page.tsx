"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-500 to-indigo-500">
      <h1 className="text-5xl font-bold text-white mb-4">Welcome to Our Application!</h1>
      <p className="text-lg text-white text-center max-w-2xl">
        We&apos;re glad to have you here. Explore the app to find out more about what we offer.
      </p>
      <button
        onClick={() => router.push('/products')}
        className="mt-10 bg-white text-blue-500 font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-100"
      >
        Go to Products
      </button>
    </main>
  );
}

