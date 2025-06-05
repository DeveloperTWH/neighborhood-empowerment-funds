import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import CreateCampaignForm from './components/CreateCampaignForm';

interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  role?: string;
  id?: string;
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  const user = session.user as ExtendedUser;

  const userData = {
    welcomeMessage: `Welcome back, ${user.name || user.email}!`,
    email: user.email ?? '',
    role: user.role ?? '',
    id: user.id ?? '',
  };

return (
  <div className="relative min-h-screen bg-gray-50">
    <main className="p-8 pb-32 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-2">{userData.welcomeMessage}</p>
      <p>Email: {userData.email}</p>
      <p>Role: {userData.role}</p>

      <CreateCampaignForm />
    </main>
  </div>
);

}
