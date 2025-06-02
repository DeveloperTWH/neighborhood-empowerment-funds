"use client";

import React from "react";

const ContactUs = () => {
  return (
    <section className="max-w-7xl mx-auto md:px-8 px-4 md:py-10 py-5">
      <h1 className="md:text-4xl text-2xl text-[#131827] font-semibold uppercase relative w-fit md:w-[500px]">
        Contact Us
        <div className="absolute md:bottom-1 bottom-1 md:right-[23%] left-1 md:w-40 w-28 h-2 bg-primary/75 -rotate-2 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {/* Contact Form */}
        <div>
          <form className="space-y-6">
            <div>
              <label className="block text-[#131827] font-medium">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-[#131827] font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-[#131827] font-medium">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Write your message here..."
              />
            </div>
            <button
              type="submit"
              className="bg-[#131827] text-white px-6 py-2 rounded-full hover:bg-dark/90 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <div className="flex items-center">
            <svg
              className="text-[#ffad19] mr-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
            </svg>
            <span>info@example.com</span>
          </div>
          <div className="flex items-center">
            <svg
              className="text-[#ffad19] mr-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" />
            </svg>
            <span>+123 456 7890</span>
          </div>
          <div className="flex items-center">
            <svg
              className="text-[#ffad19] mr-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              fill="currentColor"
            >
              <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
            </svg>
            <span>123 Main Street, Anytown</span>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="mt-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153169!3d-37.81627927975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d9f0b1b0c1e0!2sVictoria!5e0!3m2!1sen!2sau!4v1634234567890!5m2!1sen!2sau"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default ContactUs;
