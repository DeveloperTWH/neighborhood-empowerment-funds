"use client";
import React, { useState } from "react";
import Clients from "../components/Clients";
import Image from "next/image";

const ProcessPage = () => {
const [selectedTab, setSelectedTab] = useState("Be Your Evangelists");

  const tabContent: Record<string, { text: string; author: string; subtitle: string }> = {
    "Be Your Evangelists": {
      text: "In Year 1, We Put Up Merchandise Sales Of Almost $750,000. Our Community Owners Want All Of Our Merch So That They Can Go Out And Say, This Is Something I'm A Part Of.",
      author: "Wes Burdine",
      subtitle: "Co-Founder, Minnesota Women's Soccer\nRaised $1,000,000 From 3,081 Investors",
    },
    "Join Your Team": {
      text: "Empower talented individuals to join your mission and bring unique skills to your venture.",
      author: "Jane Doe",
      subtitle: "Head of Growth, Startup Inc.",
    },
    "Refer Your Customers": {
      text: "Your loyal audience can refer new customers and help expand your market reach.",
      author: "Mike Johnson",
      subtitle: "Marketing Strategist, ReferMe",
    },
    "Become Customers": {
      text: "Let your evangelists experience your product directly as loyal customers.",
      author: "Sara Lee",
      subtitle: "Customer Success Head, SaaS Co",
    },
    "Enhance Perception": {
      text: "Boost your brand credibility by showing organic community participation.",
      author: "Tom Ray",
      subtitle: "Founder, BrandBuild",
    },
  };


  const tabs = Object.keys(tabContent);

  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-[#fff] to-[#f5f7ff]">
        <h1 className="text-4xl font-semibold mb-4">
          Let’s get you{" "}
          <span className="text-[#001d59] font-bold">funded in minutes</span>
        </h1>
        <p className="mb-6 text-gray-600">
          Various ventures have reached over the years, sometimes by accident,
          sometimes on purpose without the know-how and little time.
        </p>
        <div className="flex justify-center gap-8 mb-4">
          <div>
            <p className="text-xl font-bold">140+</p>
            <p>Total Campaigns</p>
          </div>
          <div>
            <p className="text-xl font-bold">$1.2B</p>
            <p>Revenue Generated</p>
          </div>
        </div>
        <button className="bg-yellow-400 px-6 py-2 rounded font-medium hover:bg-yellow-500 transition">
          Discover opportunities
        </button>
      </section>

      {/* Cards Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 py-12">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-gray-100 h-48 rounded-lg flex items-center justify-center shadow-md"
          >
            <span className="text-gray-500">Card {item}</span>
          </div>
        ))}
      </section>

      {/* Capital Raise Section */}
      <section className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-2">
          MORE THAN JUST A <span className="text-[#001d59]">CAPITAL RAISE</span>
        </h2>

        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Many desktop publishing packages and web page editors now use lorem ipsum as their default model text
        </p>

        <div className="flex flex-col md:flex-row items-start justify-center gap-8 px-6">
          {/* Tab List */}
          <div className="w-full md:w-1/4 border-r border-gray-200">
            <ul className="space-y-4 text-sm text-left">
              {tabs.map((tab) => (
                <li
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`cursor-pointer pb-1 border-b ${
                    selectedTab === tab ? "font-semibold text-black border-black" : "text-gray-500 border-transparent"
                  }`}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>

          {/* Tab Content */}
          <div className="bg-[#fff8f3] p-6 rounded-xl shadow-md flex gap-6 items-center w-full md:w-3/5">
            <div className="flex-1">
              <p className="text-gray-700 text-md italic mb-4">"{tabContent[selectedTab].text}"</p>
              <p className="text-black font-bold text-sm">{tabContent[selectedTab].author}</p>
              <p className="text-gray-500 text-xs whitespace-pre-line">{tabContent[selectedTab].subtitle}</p>
            </div>
            <div className="hidden md:block w-40 h-40 relative">
              <Image
                src="/index/Ellipse 8.png"
                alt="testimonial visual"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-6">
        <h3 className="text-2xl font-bold text-center mb-4">
          FOLLOW A PROCESS TRUSTED BY OVER{" "}
          <span className="text-[#001d59]">1,000 PEOPLE</span>
        </h3>
        <div className="space-y-6 max-w-4xl mx-auto">
          {[
            "Build A Superfan Funnel",
            "Identify An Audience Who Loves Your Product",
          ].map((step, idx) => (
            <div
              key={idx}
              className="p-6 border rounded-lg bg-[#fffaf2] shadow-sm"
            >
              <h4 className="font-semibold text-lg mb-1">{step}</h4>
              <p className="text-sm text-gray-600">
                A blend of AI-based audience... (content placeholder)
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50 text-center px-6">
        <h3 className="text-2xl font-bold mb-8">
          OUR <span className="text-[#001d59]">BENEFITS</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: "Save Time" },
            { title: "Fully Secure" },
            { title: "24/7 Support" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded shadow text-sm">
              <h4 className="font-medium text-lg mb-2">{item.title}</h4>
              <p className="text-gray-600">
                A little more generic info here as placeholder text.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <Clients />

      {/* FAQ */}
      <section className="py-16 px-6">
        <h3 className="text-xl font-semibold text-center mb-8">
          FREQUENTLY <span className="text-[#001d59]">ASKED QUESTIONS</span>
        </h3>
        <div className="space-y-4 max-w-2xl mx-auto">
          {[1, 2, 3].map((item) => (
            <details key={item} className="bg-gray-100 p-4 rounded">
              <summary className="cursor-pointer font-medium">
                Question {item}
              </summary>
              <p className="text-sm text-gray-600 mt-2">
                Answer placeholder text for FAQ item {item}.
              </p>
            </details>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-yellow-400 px-6 py-2 rounded font-medium hover:bg-yellow-500 transition">
            Discover opportunities
          </button>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-6 bg-white text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[1, 2].map((vid) => (
            <div key={vid} className="bg-black aspect-video">
              <p className="text-white">Video Placeholder {vid}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <footer className="bg-yellow-400 py-12 text-center">
        <h3 className="text-xl font-bold mb-2">
          Ready To Launch Your Campaign?
        </h3>
        <p className="mb-4">Join 1,000+ Creators Who’ve Partnered With Us...</p>
        <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition">
          Start Your Campaign Today
        </button>
      </footer>
    </div>
  );
};

export default ProcessPage;
