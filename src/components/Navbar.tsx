"use client"
import Link from 'next/link';
import { useAuth } from '@/context/Authcontext';

const Navbar = () => {
  const { token } = useAuth();
  
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-center space-x-4">
        {!token ? (
          <>
            <li>
              <Link href="/login" className="text-white hover:text-gray-400">
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" className="text-white hover:text-gray-400">
                Signup
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/logout" className="text-white hover:text-gray-400">
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
