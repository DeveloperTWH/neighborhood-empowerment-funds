"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const imagesLeftColumn = ["/index/image (1).png", "/index/image (3).png"];
const imagesRightColumn = ["/index/image (2).png", "/index/image (4).png"];

export default function Hero() {
  const leftTextRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLParagraphElement>(null);

  // Refs for all image wrappers in both columns
  const imagesRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Clear refs on each render
  imagesRefs.current = [];

  // Add each image wrapper ref to imagesRefs
  const addToImagesRefs = (el: HTMLDivElement | null) => {
    if (el && !imagesRefs.current.includes(el)) {
      imagesRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Animate left text: fade in + slide up
    if (leftTextRef.current) {
      gsap.fromTo(
        leftTextRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    }

    // Animate number count up for "140+"
    if (numberRef.current) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 140,
        duration: 2,
        ease: "power1.out",
        onUpdate() {
          if (numberRef.current) {
            numberRef.current.textContent = Math.floor(obj.val) + "+";
          }
        },
      });
    }

    // Animate images reveal: fade + slide up only (no scale)
    if (imagesRefs.current.length > 0) {
      gsap.fromTo(
        imagesRefs.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.5,
        }
      );
    }
  }, []);

  // GSAP hover animation handlers for images
  const handleMouseEnter = (index: number) => {
    if (imagesRefs.current[index]) {
      gsap.to(imagesRefs.current[index], {
        scale: 0.95,
        rotation: -2,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    if (imagesRefs.current[index]) {
      gsap.to(imagesRefs.current[index], {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  };

  return (
    <section className="w-screen border-b-2 border-amber-200">
      <section className="max-w-7xl mx-auto md:h-[90vh] overflow-hidden px-4 md:px-8 py-10 md:py-16 flex flex-col md:flex-row justify-between gap-12">
        {/* Left text content */}
        <div
          ref={leftTextRef}
          className="max-w-xl w-full text-center md:text-left md:pt-10"
        >
          <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">
            #1 crowdfunding platform
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Successful Fundraisers Start Here
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Build a diverse investment portfolio and back the businesses you
            care about from just £10.
          </p>
          <div className="mt-6">
            <Link
              href="#"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-full text-sm"
            >
              Discover opportunities
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-8 flex flex-col sm:flex-row gap-6 sm:gap-12 justify-center md:justify-start text-center md:text-left">
            <div>
              <p ref={numberRef} className="text-2xl font-bold text-gray-900">
                0+
              </p>
              <p className="text-sm text-gray-600">Total Currencies</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">$1.2B</p>
              <p className="text-sm text-gray-600">Revenue Generated</p>
            </div>
          </div>

          {/* Logos */}
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-2 text-center md:text-left">
              We've Been Featured In:
            </p>
            <div className="flex justify-center md:justify-start">
              <Image
                src="/index/logos.png"
                alt="Featured logos"
                width={400}
                height={70}
                className="h-auto max-w-full"
              />
            </div>
          </div>
        </div>

        {/* Right images */}
        <div className="flex w-full md:w-1/2 justify-center gap-4">
          {/* Left column images */}
          <div className="flex flex-col gap-4 md:gap-6">
            {imagesLeftColumn.map((src, idx) => (
              <div
                key={idx}
                ref={(el) => addToImagesRefs(el)}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                className={`cursor-pointer inline-block ${
                  idx === 0 ? "-mt-6" : ""
                }`}
              >
                <Image
                  alt={`Image ${idx + 1}`}
                  loading="lazy"
                  width={300}
                  height={300}
                  decoding="async"
                  className="rounded-lg w-[250px] md:w-[300px]"
                  style={{ color: "transparent" }}
                  src={src}
                />
              </div>
            ))}
          </div>

          {/* Right column images */}
          <div className="flex flex-col gap-4 md:gap-6">
            {imagesRightColumn.map((src, idx) => {
              const imageIndex = idx + imagesLeftColumn.length;
              return (
                <div
                  key={idx}
                  ref={(el) => addToImagesRefs(el)}
                  onMouseEnter={() => handleMouseEnter(imageIndex)}
                  onMouseLeave={() => handleMouseLeave(imageIndex)}
                  className="cursor-pointer inline-block"
                >
                  <Image
                    alt={`Image ${imageIndex + 1}`}
                    loading="lazy"
                    width={300}
                    height={300}
                    decoding="async"
                    className="rounded-lg w-[250px] md:w-[300px]"
                    style={{ color: "transparent" }}
                    src={src}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
}
