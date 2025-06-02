"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Globe,
  Building2,
  Linkedin,
  Info,
  CheckCircle,
  Lock,
} from "lucide-react";

const galleryImages = [
  "/campaign-hero.jpg",
  "/thumb-1.jpg",
  "/thumb-2.jpg",
  "/thumb-3.jpg",
  "/thumb-4.jpg",
  "/thumb-5.jpg",
];

const CampaignDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  return (
    <div className="bg-white text-black">
      {/* Hero + Gallery */}
      <section>
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden">
            <Image
              src={selectedImage}
              alt="Hero"
              fill
              priority
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto py-4">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`min-w-[80px] h-[60px] overflow-hidden rounded-md border-2 ${
                  selectedImage === img
                    ? "border-yellow-400"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt={`thumb-${i}`}
                  width={80}
                  height={60}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-screen-xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-10">
            {/* Logo + Title + Description */}
            <div className="flex items-start gap-4">
              <Image
                src="/padelhub-logo.png"
                alt="Padel Hub Logo"
                width={48}
                height={48}
                className="rounded"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  The Padel Hub
                </h1>
                <p className="text-gray-600 mt-2 text-[15px] leading-relaxed">
                  The Padel Hub aims to capitalise on the rapidly increasing
                  interest in padel across the UK by offering indoor facilities
                  combining key locations, a tailored digital platform and a
                  strong focus on community through events & coaching. They are
                  planning to expand their presence, continue to promote the
                  sport and help to support the growth of a vibrant padel
                  community.
                </p>
              </div>
            </div>

            {/* Key Info Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Info size={20} className="text-gray-700" /> Key information
                </h2>
                <div className="flex items-center gap-4 text-sm text-blue-600">
                  <a
                    href="#"
                    className="hover:underline flex items-center gap-1"
                  >
                    <Globe size={16} /> Website
                  </a>
                  <a
                    href="#"
                    className="hover:underline flex items-center gap-1"
                  >
                    <Building2 size={16} /> Companies House
                  </a>
                  <a
                    href="#"
                    className="hover:underline flex items-center gap-1"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a href="#" className="hover:underline">
                    <Image
                      src="/icon-instagram.svg"
                      alt="ig"
                      width={16}
                      height={16}
                    />
                  </a>
                  <a href="#" className="hover:underline">
                    <Image
                      src="/icon-facebook.svg"
                      alt="fb"
                      width={16}
                      height={16}
                    />
                  </a>
                </div>
              </div>

              {/* Key Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 bg-gray-50 p-6 rounded-xl shadow text-center text-sm">
                <div>
                  <p className="text-gray-500 text-xs font-medium">RAISED</p>
                  <p className="font-bold text-lg">£1,432,615</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium">INVESTORS</p>
                  <p className="font-bold text-lg">127</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium">TARGET</p>
                  <p className="font-bold text-lg">£1,350,000</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium">EQUITY</p>
                  <p className="font-bold text-lg">5.42%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium">
                    PRE-MONEY VALUATION
                  </p>
                  <p className="font-bold text-lg">£25,000,000</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium">
                    SHARE PRICE
                  </p>
                  <p className="font-bold text-lg">£2.50</p>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-[#fdf8f3] border rounded-lg px-4 py-3 text-sm flex items-start gap-3">
                <Info size={18} className="text-gray-500 mt-0.5" />
                <p className="text-gray-700 leading-relaxed">
                  Forms part of a wider round, in which the Company had already
                  raised <strong>£1,244,000</strong> as further additional
                  investment alongside the crowdfunding element, which was
                  reflected onto the progress bar.
                </p>
              </div>

              {/* Value Highlights List */}
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-orange-400 mt-1" size={18} />
                  <p>
                    3 sites now operational, with one further site planned for
                    launch in Q4
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-orange-400 mt-1" size={18} />
                  <p>1 site achieved breakeven ahead of plan</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-orange-400 mt-1" size={18} />
                  <p>
                    Supporting LTA and Team GB to host training sessions and
                    national/international tournaments
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-orange-400 mt-1" size={18} />
                  <p>
                    Technogym gym, bar/cafe area, seating/relaxation area,
                    conference rooms, changing rooms/showers
                  </p>
                </div>
              </div>
            </div>

            {/* Problem / Solution / Market */}
            <div className="space-y-6 pt-10 border-t mt-10">
              {[
                {
                  title: "Problem",
                  desc: "The rapidly growing sport of padel is underserved in the UK, with a significant lack of accessible, high-quality facilities to meet the increasing demand among players of all levels. In 2024 there were over 16,000 padel courts registered in Spain, and only just over 400 in the UK. Majority of padel courts in the UK are outdoor, making the experience and enjoyment of the game harder to achieve due to local weather conditions.",
                },
                {
                  title: "Solution",
                  desc: "We’re expanding our network of indoor padel centres across the UK, offering high–quality facilities, training programmes and hosting tournaments to cater to the growing padel enthusiast community. We strive for The Padel Hub brand to be synonymous with high quality padel experience, no matter the weather conditions or the level of players’ experience.",
                },
                {
                  title: "Market & Growth",
                  desc: "The UK padel market is experiencing rapid growth, mirroring global trends, as the sport gains popularity among diverse demographics seeking active, social sporting experiences.",
                },
                {
                  title: "Business model",
                  desc: "We operate an all-inclusive Membership program. Additional revenue streams include: pay&play, group and individual coaching, kids camps, corporate & private events, local & international tournaments, equipment hire, bar/cafe, padel equipment & apparel shop.",
                },
                {
                  title: "Competition",
                  desc: "We are an indoor padel club operator in the UK, offering an all-inclusive membership program and provide premium facilities and experience to our club users. We have collaborations with LTA, GB Team, and worldwide renowned Hello Padel Academy. In addition, we are proud sponsors of GB Team players, and world top 20 player Lucas Bergamini.",
                },
                {
                  title: "Use of funds",
                  desc: "The proceeds to be used for group marketing activities, clubs’ facilities improvements, operational support and to help towards the buildout and operational launch of 1 additional club.",
                },
              ].map((item, i) => (
                <div key={i}>
                  <h3 className="text-base font-semibold mb-1 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <section className="bg-[#0a0b4f] py-16 px-6 mt-16 rounded-2xl">
              <div className="max-w-md mx-auto text-white text-center">
                <h2 className="text-xl font-bold leading-snug mb-4">
                  To see the rest of this opportunity, join now. It’s free,
                  quick and easy.
                </h2>
                <p className="text-sm text-gray-200 mb-6">
                  Due to financial regulations, you need to join our community
                  to view the full investment opportunity.
                </p>
                <button className="bg-yellow-400 text-black px-6 py-2 rounded-full font-medium hover:bg-yellow-500 transition w-full mb-3">
                  Join Crowdcube today
                </button>
                <p className="text-sm text-gray-300">
                  Already a member?{" "}
                  <a href="#" className="underline">
                    Log in
                  </a>
                </p>
                <div className="flex justify-center mt-6">
                  <Image
                    src="/lock-bag.svg"
                    alt="lock bag"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="bg-gray-50 p-6 rounded-xl shadow-md sticky top-24 h-fit">
            <p className="text-sm font-medium text-gray-500 mb-1">
              £1,432,615 raised
            </p>
            <p className="text-xs text-gray-400 mb-4">
              106% of target · 127 investors
            </p>
            <p className="text-sm font-semibold text-gray-800 mb-2">
              Invest in The Padel Hub
            </p>
            <p className="text-sm text-gray-500 mb-4">
              It’s free, quick and easy to sign up.
            </p>
            <button className="bg-yellow-400 w-full py-2 rounded-full font-medium mb-2 hover:bg-yellow-500">
              Join to invest
            </button>
            <button className="border border-gray-300 w-full py-2 rounded-full font-medium hover:bg-gray-100">
              Login
            </button>

            <p className="text-xs text-gray-400 mt-4">
              Last investment <strong>14 minutes ago</strong>
            </p>

            <ul className="mt-6 text-sm text-gray-600 space-y-2 border-t pt-4">
              <li className="font-semibold">Key information</li>
              <li className="opacity-50 flex items-center gap-2">
                <Lock size={14} /> Summary of Key Information and Risks
              </li>
              <li className="opacity-50 flex items-center gap-2">
                <Lock size={14} /> Updates
              </li>
              <li className="opacity-50 flex items-center gap-2">
                <Lock size={14} /> Discussion
              </li>
            </ul>
          </aside>
        </div>
      </section>

      {/* Approved & Risk Section */}
      <section className="bg-[#fffdf6] py-16 px-6">
        <div className="max-w-screen-md mx-auto space-y-12">
          {/* Approval Block */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              This opportunity is approved by Us
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              This opportunity was approved as a financial promotion by Limited
              on 22/11/2024, 10:17. Every opportunity on is reviewed to ensure
              it is fair, clear and not misleading.
            </p>
            <p className="text-sm text-gray-700 mb-4">
              Where this opportunity links to other sites and resources provided
              by third parties, these links are provided for your information
              only. We have no control over the contents of those sites or
              resources, and accept no responsibility for them or for any loss
              or damage that may arise from your use of them.
            </p>
            <p className="text-sm text-gray-700 mb-4">
              If this opportunity contains details of historical performance,
              investors should be aware that past performance is not a reliable
              indicator of future results.
            </p>
            <p className="text-sm text-gray-700 mb-4">
              As part of our commitment to investor transparency, outlines the
              analysis and verification that is conducted on equity fundraises
              on Crowdcube Capital.
            </p>
            <a href="#" className="text-sm text-blue-600 underline">
              Read more
            </a>
          </div>

          {/* Risk Warning */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Risk warning
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Investing in start–ups and early stage businesses involves risks,
              including illiquidity, lack of dividends, loss of investment and
              dilution, and it should be done only as part of a diversified
              portfolio. Crowdcube is targeted exclusively at investors who are
              sufficiently sophisticated to understand these risks and make
              their own investment decisions. You will only be able to invest
              via Crowdcube once you are registered as sufficiently
              sophisticated.{" "}
              <a href="#" className="text-blue-600 underline">
                Please click here to read the full Risk Warning.
              </a>
            </p>
            <p className="text-sm text-gray-700">
              Crowdcube Capital Limited is authorised and regulated by the
              Financial Conduct Authority (FCA). Investment Opportunities are
              not offers to the public and investments can only be made by
              members of crowdcube.com; EU resident investors should visit
              services provided by Crowdcube Europe SL. Further restrictions and
              Crowdcube’s limitation of liability are set out in the{" "}
              <a href="#" className="text-blue-600 underline">
                Investor Terms and Conditions.
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampaignDetailPage;
