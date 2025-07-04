"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const dummyCampaigns = new Array(6).fill({
  _id:"abb1",
  title: "POLYCADE",
  subtitle:
    "All of our merch so that they can go out and say, this is something I'm a part of.",
  platform: "INDIEGOGO",
  amount: "$158,000",
  img: "/campaign/image (14).png",
});

interface Campaign {
  title: string;
  description?: string;
  platform?: string;
  fundingTarget?: string;
  logoUrl?: string;
  amount?: string;
}

const CampaignsPage = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [liveCampaigns, setLiveCampaigns] = useState<Campaign[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const exploreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (exploreRef.current) {
      gsap.fromTo(
        exploreRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    const validCards = cardsRef.current.filter(Boolean);
    if (validCards.length > 0) {
      gsap.fromTo(
        validCards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [activeTab, liveCampaigns]);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const res = await fetch("/api/campaigns/public");
        const data = await res.json();
        if (data.success) {
          setLiveCampaigns(data.campaigns);
        }
      } catch (err) {
        console.error("Failed to fetch campaigns", err);
      }
    }

    fetchCampaigns();
  }, []);

  const allCampaigns = [...dummyCampaigns, ...liveCampaigns];

  return (
    <div className="bg-white text-black">
      {/* Explore Section */}
      <section className="py-20" ref={exploreRef}>
        <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 items-center gap-12">
          <div>
            <h2 className="text-4xl font-bold leading-snug mb-4">
              EXPLORE OUR{" "}
              <span className="text-[#001d59] underline decoration-yellow-400">
                SUCCESSFUL
              </span>
              <br /> CAMPAIGNS
            </h2>
            <p className="text-gray-600 mb-6">
              Discover how we've launched and scaled products to exceed their
              goals.
            </p>
            <button className="bg-yellow-400 px-6 py-2 font-medium hover:bg-yellow-500 transition rounded-full">
              View More Details
            </button>
          </div>
          <div className="rounded-xl overflow-hidden shadow-md">
            <Image
              src="/campaign/image (16).png"
              alt="success"
              width={600}
              height={400}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Campaign Highlights Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold leading-snug text-center md:text-left">
              RECENT AND{" "}
              <span className="text-[#001d59] underline decoration-yellow-400">
                PAST
              </span>
              <br className="hidden md:block" /> CAMPAIGN HIGHLIGHTS
            </h2>
            <div className="mt-6 md:mt-0 flex gap-4">
              <button
                onClick={() => setActiveTab("current")}
                className={`px-4 py-2 rounded-full font-medium text-sm border ${
                  activeTab === "current"
                    ? "bg-yellow-400 text-black"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                Current Campaigns
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-2 rounded-full font-medium text-sm border ${
                  activeTab === "past"
                    ? "bg-yellow-400 text-black"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                Past Campaigns
              </button>
            </div>
          </div>

          {/* Clear and populate refs before animation */}
          {(() => {
            cardsRef.current = [];
            return null;
          })()}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {allCampaigns.map((camp, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="relative rounded-2xl overflow-hidden shadow-xl text-white h-96 flex flex-col justify-end p-6"
                style={{
                  backgroundImage: `url('${camp.logoUrl || camp.img}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent absolute inset-0 z-0" />
                <div className="relative z-10">
                  <p className="font-bold text-xl mb-1">{camp.title}</p>
                  <p className="text-sm mb-2">
                    {camp.description || camp.subtitle}
                  </p>
                  <p className="text-pink-400 text-sm font-semibold mb-1">
                    {camp.platform || "CUSTOM"}
                  </p>
                  <p className="text-yellow-300 font-bold text-lg">
                    $ {camp.fundingTarget || camp.amount}{" "}
                    <span className="text-sm font-normal">Raised</span>
                  </p>
                  <a
                    href={`/campaigns/${camp._id || camp.id || ""}`}
                    className="mt-4 inline-block bg-yellow-400 text-black px-4 py-2 rounded font-medium text-sm hover:bg-yellow-500 transition"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampaignsPage;
