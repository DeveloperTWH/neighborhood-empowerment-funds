'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface Campaign {
  _id: string;
  title: string;
  image?: string;
  logoUrl?: string;
  description?: string;
  subtitle?: string;
  amountRaised: number;
  fundingTarget: number;
  amount?: number;
  deadline: string;
  category?: string;
  status?: string;
  platform?: string;
}

interface CampaignsResponse {
  campaigns: Campaign[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const categories = ['All', 'Tech', 'Art', 'Health', 'Education'];
const statuses = ['All', 'active', 'completed', 'canceled', 'paused'];

export default function UserCampaignsPage() {
  const { data: session, status } = useSession();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Local state for immediate input changes
  const [searchInput, setSearchInput] = useState('');
  // Debounced search value
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const cardsRef = useRef<HTMLDivElement[]>([]);

  const userId = session?.user?.id || '';

  // Debounce effect for search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setPage(1); // reset page on new search
    }, 500); // 500ms debounce delay

    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    if (!userId) return;

    const fetchCampaigns = async () => {
      setLoading(true);

      const params = new URLSearchParams();
      params.append('ownerId', userId);
      params.append('page', page.toString());
      params.append('limit', '9');
      if (category !== 'All') params.append('category', category);
      if (statusFilter !== 'All') params.append('status', statusFilter);
      if (debouncedSearch) params.append('search', debouncedSearch);

      try {
        const res = await fetch(`/api/campaigns?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch campaigns');

        const data: CampaignsResponse = await res.json();
        setCampaigns(data.campaigns);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [userId, page, category, statusFilter, debouncedSearch]);

  if (status === 'loading'){
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="loader"></div>
            </div>
        );
    }
  if (!userId){
      redirect('/signin');
    } 

  const goPrev = () => page > 1 && setPage(page - 1);
  const goNext = () => page < totalPages && setPage(page + 1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Campaigns</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-10">
        <select
          className="border rounded px-3 py-2"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          {statuses.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search campaigns..."
          className="border rounded px-3 py-2 flex-grow min-w-[200px]"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {/* Campaign Cards */}
      {loading ? (
        <p>Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {campaigns.map((camp, index) => {
            const progressPercent = Math.min(
              100,
              Math.round((camp.amountRaised / camp.fundingTarget) * 100)
            );

            return (
              <div
                key={camp._id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="relative rounded-2xl overflow-hidden shadow-xl text-white h-96 flex flex-col justify-end p-6"
                style={{
                  backgroundImage: `url('${camp.logoUrl || camp.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent absolute inset-0 z-0" />
                <div className="relative z-10 flex flex-col flex-grow justify-end">
                  <p className="font-bold text-xl mb-1">{camp.title}</p>
                  <p className="text-sm mb-2">
                    {camp.description || camp.subtitle || 'No description'}
                  </p>
                  <p className="text-pink-400 text-sm font-semibold mb-1">
                    {camp.platform || 'CUSTOM'}
                  </p>


                  {/* Progress Bar */}
                  <div className="w-full bg-gray-600 rounded-full h-4 mb-2 overflow-hidden">
                    <div
                      className="bg-green-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="text-yellow-300 font-bold text-sm mb-4">
                    {progressPercent}% funded
                  </p>
                  <p className="text-yellow-300 font-bold text-lg">
                    $ {camp.amountRaised} raised of ${camp.fundingTarget}
                  </p>

                  <Link
                    href={`/dashboard/campaigns/${camp._id}`}
                    className="mt-4 inline-block bg-yellow-400 text-black px-4 py-2 rounded font-medium text-sm hover:bg-yellow-500 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-12">
        <button
          onClick={goPrev}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={goNext}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded ${
            page === totalPages
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
