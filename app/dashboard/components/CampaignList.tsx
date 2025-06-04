'use client';

import { useEffect, useState } from 'react';

interface Campaign {
  _id: string;
  title: string;
  fundingTarget: string;
  status: string;
}

export default function CampaignList({ ownerId }: { ownerId: string }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const res = await fetch(`/api/campaigns?ownerId=${ownerId}`);
        const data = await res.json();
        setCampaigns(data.campaigns || []);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, [ownerId]);

  if (loading) {
    return <p>Loading your campaigns...</p>;
  }

  if (campaigns.length === 0) {
    return <p>No campaigns found.</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Your Campaigns</h2>
      <ul className="space-y-3">
        {campaigns.map(campaign => (
          <li key={campaign._id} className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-medium">{campaign.title}</h3>
            <p>Funding Target: {campaign.fundingTarget}</p>
            <p>Status: {campaign.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
