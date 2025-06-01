"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

const services = [
  {
    title: "Branding",
    image: "/service-1.jpg",
    description:
      "Don’t let your boring designs push your competitor ahead.\nWe provide amazing designs for your brand so that your audience’s jaw drops every time!\n\nMany desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years.",
    features: [
      "Logo Design",
      "Business Cards & Stationery",
      "Flyer & Brochure Design",
      "Social Media Design",
      "Signage Design",
      "Packaging & Label Design"
    ]
  },
  {
    title: "Website Solution",
    image: "/service-2.jpg",
    description:
      "Don’t let your boring designs push your competitor ahead.\nWe provide amazing designs for your brand so that your audience’s jaw drops every time!\n\nMany desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years.",
    features: [
      "Logo Design",
      "Business Cards & Stationery",
      "Flyer & Brochure Design",
      "Social Media Design",
      "Signage Design",
      "Packaging & Label Design"
    ]
  },
  {
    title: "Web Development",
    image: "/service-3.jpg",
    description:
      "Don’t let your boring designs push your competitor ahead.\nWe provide amazing designs for your brand so that your audience’s jaw drops every time!\n\nMany desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years.",
    features: [
      "Logo Design",
      "Business Cards & Stationery",
      "Flyer & Brochure Design",
      "Social Media Design",
      "Signage Design",
      "Packaging & Label Design"
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-white text-black">
      <section className="max-w-screen-xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-[#001d59] underline decoration-yellow-400">IT SERVICES</h2>

        {services.map((service, i) => (
          <div key={i} className="grid md:grid-cols-2 gap-10 items-center mb-24">
            {i % 2 === 0 ? (
              <>
                <Image
                  src={service.image}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="rounded-lg w-full h-auto object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-sm text-gray-700 mb-4 whitespace-pre-line">{service.description}</p>
                  <div className="grid grid-cols-2 gap-x-4 text-sm text-black mb-6">
                    {service.features.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-yellow-500 mt-[2px]" /> {f}
                      </div>
                    ))}
                  </div>
                  <button className="bg-yellow-400 text-black text-sm px-6 py-2 rounded hover:bg-yellow-500 transition">
                    CONTACT US
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-sm text-gray-700 mb-4 whitespace-pre-line">{service.description}</p>
                  <div className="grid grid-cols-2 gap-x-4 text-sm text-black mb-6">
                    {service.features.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-yellow-500 mt-[2px]" /> {f}
                      </div>
                    ))}
                  </div>
                  <button className="bg-yellow-400 text-black text-sm px-6 py-2 rounded hover:bg-yellow-500 transition">
                    CONTACT US
                  </button>
                </div>
                <Image
                  src={service.image}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="rounded-lg w-full h-auto object-cover"
                />
              </>
            )}
          </div>
        ))}
      </section>

      {/* Get the award-winning support section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full h-[500px]">
          <Image
            src="/index/image (5).png"
            alt="Award video"
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-white text-center text-black p-10 rounded-xl shadow-lg max-w-xl w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Get the award-winning<br /> support you deserve
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              As a multi-Stevie Award winner for customer service and a 1st place recipient.
            </p>
            <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 text-sm">
              CONTACT US NOW
            </button>
          </div>
        </div>
        <div className="h-[200px]"></div>
      </section>
    </div>
  );
}
