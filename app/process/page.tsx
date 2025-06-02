"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Clients from "../components/Clients";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);


/* eslint-disable @next/next/no-img-element */


const ProcessPage = () => {
  const [selectedTab, setSelectedTab] = useState("Be Your Evangelists");

  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!heroRef.current) return;

    // Hero fade + slide down on scroll
    gsap.from(heroRef.current, {
      opacity: 0,
      y: -40,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%", // when hero top hits 80% viewport height
        toggleActions: "play none none none",
      },
    });

    // Cards fade + scale on scroll
    if (cardsRef.current) {
      gsap.from(cardsRef.current.children, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: 0.2,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    // Tabs slide from left on scroll
    if (tabsRef.current) {
      gsap.from(tabsRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: tabsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    // Benefits fade in on scroll
    if (benefitsRef.current) {
      gsap.from(benefitsRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    // FAQ fade in on scroll
    if (faqRef.current) {
      gsap.from(faqRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    // Steps fade + slide with stagger on scroll
    if (stepsRef.current?.children) {
      gsap.from(stepsRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    // Video children fade + slide stagger on scroll
    if (videoRef.current?.children) {
      gsap.from(videoRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        stagger: 0.3,
        delay: 0.5,
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    // Cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);


  const tabContent: Record<string, { text: string; author: string; subtitle: string, img: string }> = {
    "Be Your Evangelists": {
      text: "In Year 1, We Put Up Merchandise Sales Of Almost $750,000. Our Community Owners Want All Of Our Merch So That They Can Go Out And Say, This Is Something I'm A Part Of.",
      author: "Wes Burdine",
      subtitle: "Co-Founder, Minnesota Women's Soccer\nRaised $1,000,000 From 3,081 Investors",
      img: "/index/Ellipse 7.png"
    },
    "Join Your Team": {
      text: "Empower talented individuals to join your mission and bring unique skills to your venture.",
      author: "Jane Doe",
      subtitle: "Head of Growth, Startup Inc.",
      img: "/index/Ellipse 8.png"
    },
    "Refer Your Customers": {
      text: "Your loyal audience can refer new customers and help expand your market reach.",
      author: "Mike Johnson",
      subtitle: "Marketing Strategist, ReferMe",
      img: "/index/Ellipse 9.png"
    },
    "Become Customers": {
      text: "Let your evangelists experience your product directly as loyal customers.",
      author: "Sara Lee",
      subtitle: "Customer Success Head, SaaS Co",
      img: "/index/Ellipse 7.png"
    },
    "Enhance Perception": {
      text: "Boost your brand credibility by showing organic community participation.",
      author: "Tom Ray",
      subtitle: "Founder, BrandBuild",
      img: "/index/Ellipse 8.png"
    },
  };


  const tabs = Object.keys(tabContent);

  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section ref={heroRef} className="text-center py-16 bg-gradient-to-r from-[#fff] to-[#f5f7ff]">
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
      <section ref={cardsRef} className="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4 py-8 justify-items-center">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white rounded-lg overflow-hidden shadow-md flex items-center justify-center"
          >
            <img
              src={`/process/0${item}.png`}
              alt={`Process step ${item}`}
              className="max-h-full max-w-full object-contain"
            />
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

        <div ref={tabsRef} className="flex flex-col md:flex-row items-start justify-center gap-8 px-6">
          {/* Tab List */}
          <div className="w-full md:w-1/4 border-r border-gray-200">
            <ul className="space-y-4 text-sm text-left">
              {tabs.map((tab) => (
                <li
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`cursor-pointer pb-1 border-b ${selectedTab === tab ? "font-semibold text-black border-black" : "text-gray-500 border-neutral-300"
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
            <div className="hidden md:block w-30 h-30 relative">
              <Image
                src={tabContent[selectedTab].img}
                alt="testimonial visual"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Proven Process Section */}
      <section ref={stepsRef} className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-8">
          <h2 className="text-2xl md:text-4xl font-semibold text-dark uppercase relative w-full md:w-[600px]">
            Follow a Proven Process for Crowdfunding & Growth
            <div className="absolute md:bottom-1 bottom-1 md:right-[23%] left-1 md:w-40 w-16 h-2 bg-primary/75 -rotate-2 -z-10 opacity-80" />
          </h2>
          <p className="text-dark/60 w-full md:w-[500px]">
            Raising funds isn’t just about launching a campaign—it’s about building a business that attracts backers and investors. Our step-by-step system ensures you’re not just crowdfunding, but creating a scalable, profitable company.
          </p>
        </div>

        {/* Steps */}
        <div className="md:mt-24 mt-10 max-w-4xl mx-auto space-y-8">
          {[
            {
              id: 1,
              title: "Build a Solid Business Foundation",
              description:
                "Before you raise a single dollar, you need a bulletproof business model. We help you refine your strategy using the Lean Startup Methodology, business modeling, and financial projections.",
              img: "/index/svg 1.png",
            },
            {
              id: 2,
              title: "Build a Superfan Funnel",
              description:
                "Think of this as your pre-launch engine. We help you create a high-converting landing page that captures emails and builds a waiting list of superfans.",
              img: "/index/svg 2.png",
            },
            {
              id: 3,
              title: "Identify an Audience Who Loves Your Brand",
              description:
                "We help you find people already looking for a product like yours, craft the perfect message, and determine the exact ad budget needed to reach your goals.",
              img: "/index/svg 3.png",
            },
            {
              id: 4,
              title: "Scale Quickly & Profitably with Advertising",
              description:
                "Using data from your pre-launch, we optimize your ads to reach only the most engaged backers, keeping your costs low and your ROI high.",
              img: "/index/svg 4.png",
            },
            {
              id: 5,
              title: "Launch with Confidence",
              description:
                "No fear. No guesswork. Just results. By the time you hit launch, you'll have a proven strategy, an engaged audience, and a campaign ready to fund in record time.",
              img: "/index/svg 1.png",
            },
            {
              id: 6,
              title: "Maximize the Power of Quick Funding",
              description:
                "A strong launch gets you more than just money—it boosts your ranking on crowdfunding platforms, attracts free organic traffic, and opens doors to bigger opportunities.",
              img: "/index/svg 2.png",
            },
          ].map((step, idx) => (
            <div
              key={step.id}
              className={`bg-primary/10 px-6 py-6 rounded-lg shadow-sm flex flex-col md:flex-row items-center gap-6 ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
            >
              <img
                src={step.img}
                alt={step.title}
                className="w-24 h-20 object-contain md:w-32"
              />
              <div
                className={`flex flex-col gap-2 ${idx % 2 !== 0 ? "items-end text-right" : "items-start text-left"
                  }`}
              >
                <h4
                  className={`text-dark font-semibold text-base flex gap-2 items-center ${idx % 2 !== 0 ? "flex-row-reverse" : ""
                    }`}
                >
                  <span className="bg-[#ffad19] text-white font-semibold text-xs px-2 py-1 rounded-full">
                    {step.id}
                  </span>
                  {step.title}
                </h4>
                <p className="text-neutral-500 text-sm md:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* Benefits */}
      <section ref={benefitsRef} className="py-16 bg-gray-50 text-center px-6">
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
      <section ref={faqRef} className="py-16 px-6">
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
      <section ref={videoRef} className="py-16 px-6 bg-white text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Video 1 */}
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/_TVCx0m6Omg?si=U5olcN0yndQclAPx"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video 2 */}
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/5GG-VUvruzE?si=iOEanqRWRgvojdID&amp;controls=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProcessPage;
