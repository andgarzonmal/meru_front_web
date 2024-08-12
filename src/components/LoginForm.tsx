"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/Authcontext';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const { login } = useAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post('https://meru-back-api.fly.dev/login', {
        user: {
          email: data.email,
          password: data.password,
        }
      });

      const token = response.headers['authorization'];
      if (token) {
        login(token);
        router.push('/welcome');  // Redirigir a la página de bienvenida
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log("Mensaje de error:", error.response.data);
        setErrorMessage(error.response.data); // Mensaje de error de la API
      } else {
        setErrorMessage('An unexpected error occurred during login'); // Mensaje genérico
        console.log("Mensaje de error genérico");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {errorMessage && (
        <div className="mb-4 p-4 text-red-700 bg-red-200 border border-red-700 rounded">
          {errorMessage}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          {...register('email', { required: 'Email es requerido' })}
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          {...register('password', { required: 'Password es requerido' })}
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
