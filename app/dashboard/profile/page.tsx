'use client';

import { signOut } from 'next-auth/react';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSession } from 'next-auth/react';

interface User {
    name: string;
    email: string;
    phone?: string;
    avatarUrl?: string;
}

interface FormData {
    name: string;
    email: string;
    phone?: string;
}

export default function ProfilePage() {
    const { data: session } = useSession();
    const userId = session?.user?.id ?? null;

    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        phone: '',
        avatarUrl: '',
    });

    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
    });

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [removeAvatar, setRemoveAvatar] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch user data on mount or userId change
    useEffect(() => {
        if (userId) {
            fetch(`/api/users/${userId}`)
                .then((res) => res.json())
                .then((data) => {
                    setUser({
                        name: data.name || '',
                        email: data.email || '',
                        phone: data.phone || '',
                        avatarUrl: data.avatar || '',
                    });
                    setForm({
                        name: data.name || '',
                        email: data.email || '',
                        phone: data.phone || '',
                    });
                    setRemoveAvatar(false);
                    setAvatarFile(null);
                    setAvatarPreview(null);
                })
                .catch((err) => {
                    console.error('Failed to fetch user data:', err);
                })
                .finally(() => {
                    setLoading(false);
                });;
        }
    }, [userId]);

    useEffect(() => {
        const changed =
            form.name !== user.name ||
            form.email !== user.email ||
            form.phone !== user.phone ||
            !!avatarFile ||
            removeAvatar;
        setIsChanged(changed);
    }, [form, avatarFile, user, removeAvatar]);

    // Form input handler
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Avatar file input handler with preview
    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
            setRemoveAvatar(false);
        }
    };

    // Remove avatar handler
    const handleRemoveAvatar = () => {
        setAvatarFile(null);
        setAvatarPreview(null);
        setRemoveAvatar(true);
    };

    // Submit updated profile data including avatar
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isChanged) return;

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('phone', form.phone || '');
        formData.append('removeAvatar', removeAvatar.toString());
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        try {
            const res = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                body: formData,
            });

            if (!res.ok) throw new Error('Failed to update profile');

            const updated = await res.json();

            setUser({
                name: updated.name || '',
                email: updated.email || '',
                phone: updated.phone || '',
                avatarUrl: updated.avatar || '',
            });

            setAvatarFile(null);
            setAvatarPreview(null);
            setRemoveAvatar(false);
            setIsChanged(false);

            alert('Profile updated! You will be signed out.');

            // Sign out user on any update to refresh token/session
            await signOut({ callbackUrl: '/signin' });

        } catch (err) {
            console.error(err);
            alert('Error updating profile.');
        }
    };


    // Render avatar image or fallback initial
    const renderAvatar = () => {
        if (removeAvatar) {
            // Show fallback initial immediately when removing avatar
            const initial = user.name?.charAt(0).toUpperCase() || 'U';
            return (
                <div className="w-24 h-24 flex items-center justify-center bg-yellow-500 text-white text-2xl font-bold rounded-full">
                    {initial}
                </div>
            );
        }

        const avatarSrc = avatarPreview || user.avatarUrl;

        if (avatarSrc) {
            return (
                <div className="relative group">
                    <img
                        src={avatarSrc}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover border-2 border-blue-600"
                    />
                    <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full shadow hover:bg-red-700"
                        aria-label="Remove avatar"
                    >
                        ✕
                    </button>
                </div>
            );
        }

        // fallback if no avatar at all
        const initial = user.name?.charAt(0).toUpperCase() || 'U';
        return (
            <div className="w-24 h-24 flex items-center justify-center bg-yellow-500 text-white text-2xl font-bold rounded-full">
                {initial}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h1 className="text-2xl font-semibold mb-6">Your Profile</h1>

            <div className="flex items-center gap-6 mb-8">
                {renderAvatar()}
                <div>
                    <h2 className="text-xl font-medium">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md" encType="multipart/form-data">
                <div>
                    <label htmlFor="avatar" className="block font-medium mb-1">
                        Profile Image
                    </label>
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="w-full"
                    />
                </div>

                <div>
                    <label htmlFor="name" className="block font-medium mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block font-medium mb-1">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={form.phone || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className={`px-4 py-2 rounded-md transition font-medium ${isChanged
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        }`}
                    disabled={!isChanged}
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
