import React from 'react'
import Clients from './Clients'
import Image from 'next/image'

const Testimonials = () => {
  return (
    <div className='pb-20 border-b-2 border-amber-200'>
      {/* Heading and intro */}
      

      {/* Testimonials carousel or content */}
      <Clients />

      {/* Image + Text Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-0 mt-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/index/image (5).png"
              alt="Client"
              width={600}
              height={400}
              className="object-cover w-full h-auto"
              priority
            />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              Turn your ideas into reality with expert crowdfunding support. From campaign strategy to marketing, we guide you every step of the way to achieve your funding goals.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ligula ut nisi volutpat vehicula, sed facilisis.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonials
