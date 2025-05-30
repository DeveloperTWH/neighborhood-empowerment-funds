"use client";

import Image from "next/image";
import Link from "next/link";

const imagesLeftColumn = ["/index/image (1).png", "/index/image (3).png"];
const imagesRightColumn = ["/index/image (2).png", "/index/image (4).png"];

export default function Hero() {
    return (
        <section className="w-screen border-b-2 border-amber-200">
        <section className="max-w-7xl mx-auto md:h-[90vh] overflow-hidden px-4 md:px-8 py-10 md:py-16 flex flex-col md:flex-row justify-between gap-12">
            {/* Left text content */}
            <div className="max-w-xl w-full text-center md:text-left md:pt-10">
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
                        <p className="text-2xl font-bold text-gray-900">140+</p>
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
                            className={`transition-transform duration-300 ease-in-out hover:scale-95 hover:-rotate-2 ${idx === 0 ? "-mt-6" : ""
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
                    {imagesRightColumn.map((src, idx) => (
                        <div
                            key={idx}
                            className="transition-transform duration-300 ease-in-out hover:scale-95 hover:-rotate-2"
                        >
                            <Image
                                alt={`Image ${idx + imagesLeftColumn.length + 1}`}
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
            </div>
        </section>
        </section>
    );
}
