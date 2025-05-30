"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    image: "/index/image (5).png",
    description: `Turn your ideas into reality with expert crowdfunding support.
from campaign strategy to marketing,
we guide you every step of the way to achieve your funding goals.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. proin at ligula ut nisi
volutpat vehicula, sed facilisis,`,
  },
  {
    image: "/index/image (6).png",
    description: `Turn your ideas into reality with expert crowdfunding support.
from campaign strategy to marketing.
we guide you every step of the way to achieve your funding goals.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. proin at ligula ut nisi volutpat vehicula, sed facilisis,`,
  },
];

export default function SuccessStories() {
  const storyRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    storyRefs.current.forEach((el, index) => {
      if (!el) return;

      const direction = index % 2 === 0 ? -100 : 100; // left or right

      gsap.fromTo(
        el,
        { autoAlpha: 0, x: direction },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="relative text-4xl md:text-4xl font-bold text-center text-gray-900 mb-16 md:w-3/5 mx-auto leading-snug z-10">
          WE&#39;VE HELPED CREATORS RAISE <br className="hidden md:block" />
          MILLIONS FOR THEIR DREAM JOBS
          <span className="absolute bottom-0 left-10 w-[200px] h-[8px] bg-yellow-400 rotate-[-6deg] -z-10"></span>
        </h2>

        <div className="space-y-20">
          {stories.map((story, index) => (
            <div
              key={index}
              ref={(el) => {
                storyRefs.current[index] = el;
              }}
              className={`flex flex-col md:flex-row ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              } items-center gap-10`}
            >
              <div className="w-full md:w-1/2">
                <Image
                  src={story.image}
                  alt={`Success story ${index + 1}`}
                  width={600}
                  height={400}
                  className="rounded-xl object-cover w-full h-auto"
                />
              </div>
              <div className="w-full md:w-1/2">
                <p style={{ whiteSpace: "pre-line" }}>{story.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
