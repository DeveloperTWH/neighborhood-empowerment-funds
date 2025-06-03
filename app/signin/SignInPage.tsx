'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const { status } = useSession();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isReady, setIsReady] = useState(false);

  // Handle session status
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(callbackUrl);
    } else if (status === 'unauthenticated') {
      setIsReady(true);
    }
    // We do not render anything until this logic is done
  }, [status, router, callbackUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
      callbackUrl,
    });

    if (res?.error) {
      setError('Invalid email or password');
    } else {
      router.replace(res?.url || callbackUrl);
    }
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl });
  };

  // 🔄 Show full-screen loader until ready
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don’t have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.9 0 6.7 1.6 8.2 2.9l6.1-6.1C34.4 2.7 29.7 1 24 1 14.6 1 6.7 6.9 3.1 15.1l7.3 5.6C12.3 14 17.6 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.1 24.5c0-1.5-.1-2.5-.4-3.6H24v7h12.7c-.6 3.2-2.4 5.8-4.9 7.6v6.3h7.9c4.6-4.2 7.4-10.5 7.4-17.3z" />
              <path fill="#FBBC05" d="M10.4 28.5c-.5-1.5-.8-3.1-.8-4.5s.3-3.1.8-4.5L3.1 14c-1.7 3.4-2.6 7.3-2.6 11.5s.9 8.1 2.6 11.5l7.3-5.5z" />
              <path fill="#34A853" d="M24 47c6.5 0 11.9-2.1 15.8-5.6l-7.9-6.3c-2.2 1.5-5.1 2.3-7.9 2.3-6.4 0-11.8-4.5-13.6-10.6l-7.3 5.5C6.7 41.1 14.6 47 24 47z" />
              <path fill="none" d="M1 1h46v46H1z" />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
