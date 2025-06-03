'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CreateCampaignForm from './components/CreateCampaignForm';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [userData, setUserData] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signin');
    }
  }, [status, router]);

  // Fetch user-specific data once authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      if (!session || !session.user || !session.user.email) {
        setUserData(null);
        setLoadingData(false);
        return;
      }

      const user = session.user; // safe to access here

      async function fetchUserData() {
        setLoadingData(true);
        try {
          const data = {
            welcomeMessage: `Welcome back, ${user.name || user.email}!`,
            email: user.email,
            role: (user as any).role || 'user', // add your custom role type if available
            // add other user-specific info here
          };
          setUserData(data);
        } catch (error) {
          console.error('Failed to load user data:', error);
          setUserData(null);
        }
        setLoadingData(false);
      }

      fetchUserData();
    }
  }, [status, session]);

  if (status === 'loading' || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="loader"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Failed to load your dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-2">{userData.welcomeMessage}</p>
      <p>Email: {userData.email}</p>
      <p>Role: {userData.role}</p>
      <CreateCampaignForm/>
    </div>
  );
}
