import React from "react";
import Image from "next/image";

const partners = [
    { name: "Partner One", logo: "/index/image (7).png" }, // 335x334
    { name: "Partner Two", logo: "/index/image (8).png" }, // 572x334
    { name: "Partner Four", logo: "/index/image (10).png" }, // 572x251
    { name: "Partner Five", logo: "/index/image (11).png" }, // 335x251
    { name: "Partner Three", logo: "/index/image (9).png" }, // 453x624
];

export default function Partnership() {
    return (
        <div className="border-b-2 border-amber-200">
            <section className="py-20 px-4 md:px-16 bg-gray-50 max-w-7xl mx-auto">
                {/* Heading */}
                <div className="max-w-6xl mx-auto mb-16 text-center flex justify-center flex-col items-center md:text-left">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
                        WE'RE HERE TO BE YOUR LONG TERM PARTNER.
                    </h2>
                    <p className="text-gray-600 md:w-2/5 mx-auto md:mx-0 text-center">
                        The point of using lorem ipsum is that it has a search for lorem ipsum will uncover many web sites still in their infancy, various versions have evolved over the years sometimes by accident, sometimes on purpose.
                    </p>
                </div>

                {/* Custom 3-column Grid */}
                <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8 h-[624px]">
                    {/* Column 1: Image 1 + 2 */}
                    <div className="flex flex-col gap-8 h-full">
                        <div className="flex-[334] relative bg-white rounded-lg shadow-sm overflow-hidden">
                            <Image
                                src={partners[0].logo}
                                alt={partners[0].name}
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                        <div className="flex-[290] relative bg-white rounded-lg shadow-sm overflow-hidden">
                            <Image
                                src={partners[1].logo}
                                alt={partners[1].name}
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                    </div>

                    {/* Column 2: Image 4 + 5 */}
                    <div className="flex flex-col gap-8 h-full">
                        <div className="flex-[251] relative bg-white rounded-lg shadow-sm overflow-hidden">
                            <Image
                                src={partners[2].logo}
                                alt={partners[2].name}
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                        <div className="flex-[373] relative bg-white rounded-lg shadow-sm overflow-hidden">
                            <Image
                                src={partners[3].logo}
                                alt={partners[3].name}
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                    </div>

                    {/* Column 3: Image 3 (Tall) */}
                    <div className="relative bg-white rounded-lg shadow-sm overflow-hidden h-full">
                        <Image
                            src={partners[4].logo}
                            alt={partners[4].name}
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <a
                        href="/contact"
                        className="inline-block px-12 py-3 bg-yellow-400 hover:bg-yellow-500 uppercase font-semibold rounded-full transition"
                    >
                        Talk to an expert to learn more
                    </a>
                </div>
            </section>
        </div>
    );
}
