'use client'

import { useEffect, useState } from 'react'

interface Faq {
  _id: string;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)


  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch('/api/faq')
        const data = await res.json()
        setFaqs(data)
      } catch (err) {
        console.error('Failed to load FAQs', err)
      }
      finally {
        setLoading(false)
      }
    }

    fetchFaqs()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#ffad19] rounded-full animate-spin"></div>
      </div>
    )
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
            key={faq._id}
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
