'use client'
import { useState } from 'react'

const faqs = [
  {
    question: 'How much does Lift & Launch cost?',
    answer:
      'Our pricing is tailored to your needs. Whether you\'re launching a product, service, or equity campaign, we offer flexible plans that scale with your goals. Contact us for a customized quote.',
  },
  {
    question: 'What is a Reservation Funnel?',
    answer:
      'A Reservation Funnel helps you secure early interest and commitment from backers or investors before your campaign goes live.',
  },
  {
    question: 'Do I have to use the Reservation Funnel?',
    answer:
      "No, but it's one of the most effective ways to validate demand and build momentum. We also offer other funnel types.",
  },
  {
    question: 'What kind of analytics does Lift & Launch offer?',
    answer:
      'Our platform provides real-time analytics, including: funnel metrics, conversion rates, A/B test results, and ad performance insights.',
  },
  {
    question: 'How robust is the system? How easy is it to use?',
    answer:
      'Lift & Launch is built for both simplicity and power. Intuitive tools and expert support make it easy for everyone.',
  },
  {
    question: 'Do I need a prototype?',
    answer:
      'It depends. Product campaigns benefit from prototypes. For services or equity campaigns, proof of concept is key.',
  },
  {
    question: 'How much advertising budget do I need?',
    answer:
      'It depends on your goals and platform. We’ll help determine a budget that maximizes ROI and minimizes wasted spend.',
  },
  {
    question: 'How much am I going to raise?',
    answer:
      'No guarantees, but our proven strategies significantly increase your chances of hitting and exceeding your goal.',
  },
  {
    question: 'What is needed to get started?',
    answer:
      'You’ll need a strong message, high-quality visuals, a landing page, and a plan. We guide you through everything.',
  },
  {
    question: 'What is the timeline to launch?',
    answer:
      'Typically 6–12 weeks of prep: audience building, testing, and content creation. We\'ll map out a custom timeline.',
  },
  {
    question: 'What\'s the best way to get in touch with your team?',
    answer:
      'Schedule a free strategy call or reach out via email or live chat. We’re here to help!',
  },
  {
    question: 'Can you work with other agencies?',
    answer:
      'Yes! We collaborate with agencies to ensure your campaign is optimized, no matter your team setup.',
  },
  {
    question: 'Can I pause if I have a delay?',
    answer:
      'Absolutely. We understand things happen—just keep us updated and we’ll adapt your campaign schedule accordingly.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="max-w-7xl mx-auto md:px-8 px-4 md:py-14 py-8">
      <div className="relative w-fit mx-auto">
  <h1 className="md:text-4xl text-2xl text-dark font-semibold uppercase relative z-10">
    Frequently Asked Questions
  </h1>
  <div className="absolute md:bottom-1 bottom-0 md:right-2 left-1 md:w-64 w-36 h-2 bg-[#ffad19] -rotate-2 z-0"></div>
</div>

      <p className="md:w-[590px] w-full md:mt-8 mt-6 text-[#131827ab] mx-auto text-center">
        Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text
      </p>

      <div className="md:mt-12 mt-8 max-w-5xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="shadow-sm border border-[#131827]/10 rounded-lg md:px-6 px-4 py-4 mb-5"
          >
            <h4
              onClick={() => toggleFAQ(index)}
              className="text-dark font-semibold md:text-base text-sm cursor-pointer inline-flex items-center justify-between w-full"
            >
              {faq.question}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="29"
                viewBox="0 0 30 29"
                fill="none"
                className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
              >
                <path
                  d="M21.2068 11.5L14.9999 17.5L8.79297 11.5"
                  stroke="#6D6D6D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h4>
            {openIndex === index && (
              <p className="text-[#131827ab] mt-4 md:text-base text-xs">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
