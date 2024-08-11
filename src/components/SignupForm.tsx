"use client"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/Authcontext';

interface SignupFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupFormInputs>();
  const { login } = useAuth();
  const router = useRouter();
  const password = watch('password');

  const onSubmit = async (data: SignupFormInputs) => {
    if (data.password !== data.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('https://meru-back-api.fly.dev/signup', {
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
    } catch (error) {
      alert('Error en el signup');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
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

      <div className="mb-4">
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

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          {...register('confirmPassword', { required: 'Debe confirmar su contraseña' })}
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
      >
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
