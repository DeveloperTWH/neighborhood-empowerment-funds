'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';

export default function SignUpPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const { status } = useSession();

    // New state to track when ready to render form
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (status === 'authenticated') {
            router.replace(callbackUrl);
        } else if (status === 'unauthenticated') {
            setIsReady(true);
        }
        // We don't want to render the form while checking status/loading
    }, [status, router, callbackUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            const res = await axios.post('/api/auth/signup', {
                name: form.name,
                email: form.email,
                password: form.password,
            });

            if (res.status === 201) {
                router.push('/signin');
            } else {
                setError(res.data.message || 'Something went wrong');
            }
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            setError(error.response?.data?.message || 'Error creating account');
        }
    };

    
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
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
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
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                        Sign Up
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p>
                        Already have an account?{' '}
                        <a href="/signin" className="text-blue-600 hover:underline">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
