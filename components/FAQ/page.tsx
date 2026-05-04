'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: 'What is Pearl Go?',
    answer:
      'Pearl Go is an AI-powered travel planning platform designed to create personalized itineraries based on your preferences, budget, and travel style.',
  },
  {
    question: 'How does Pearl Go work?',
    answer:
      'Simply enter your destination, travel dates, and interests. Pearl Go instantly generates a customized travel plan with recommendations for activities, stays, and experiences.',
  },
  {
    question: 'Is Pearl Go suitable for first-time travelers?',
    answer:
      'Yes, Pearl Go is ideal for beginners. It provides easy-to-follow plans, helpful tips, and guidance to make your travel experience smooth and stress-free.',
  },
  {
    question: 'Can Pearl Go help reduce travel costs?',
    answer:
      'Pearl Go suggests budget-friendly options, optimized routes, and cost-saving recommendations to help you make the most of your trip without overspending.',
  },
  {
    question: 'Does Pearl Go support multi-city trips?',
    answer:
      'Yes, Pearl Go can generate detailed itineraries for multi-city journeys, including transport planning and time optimization between locations.',
  },
  {
    question: 'Can I customize my itinerary?',
    answer:
      'Absolutely. You can modify, add, or remove activities based on your preferences, giving you full control over your travel plan.',
  },
  {
    question: 'Is Pearl Go available for group or family trips?',
    answer:
      'Yes, Pearl Go can tailor itineraries for families, groups, and couples, ensuring activities and plans suit everyone’s needs.',
  },
  {
    question: 'Is Pearl Go free to use?',
    answer:
      'Pearl Go offers a free version with essential features, while advanced planning tools and premium options may require a subscription.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full px-6 lg:px-20 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl font-semibold text-gray-900 mb-3 tracking-tight">Frequently Asked Questions</h2>
        <p className="text-gray-500 mb-10 max-w-2xl">
          Everything you need to know about Pearl Go and how it helps you plan smarter trips.
        </p>

        {/* FAQ List */}
        <div className="border-t border-gray-200">
          {faqs.map((faq, index: number) => (
            <div key={index} className="border-b border-gray-200 py-5 transition-all">
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left group"
              >
                <span className="text-base font-medium text-gray-800 group-hover:text-black transition">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-black' : ''
                  }`}
                />
              </button>

              {/* Animated Answer */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
