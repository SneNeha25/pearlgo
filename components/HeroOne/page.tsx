'use client';

import { useEffect, useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const changingTexts = [
  'Help me plan a budget-friendly vacation to Colombo',
  'Find me a 3-day beach trip in Sri Lanka',
  'Plan a romantic weekend escape',
  'Suggest places for a family holiday',
  'Create a Colombo to Ella travel plan',
];

export default function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % changingTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleQuickClick = (text: string) => {
    setMessage(text);
  };

  return (
    <section className="w-full bg-gradient-to-br from-[#f7f4f1] via-white to-blue-50 pt-20 pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-[#004aad]">
            <Sparkles size={16} />
            AI Travel Assistant
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-[#24112d] md:text-6xl">
            Your trip.
            <br />
            Planned in minutes.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
            Plan destinations budgets, routes, hotels, and activities with a smart chatbot-style travel assistant.
          </p>

          {/* COMPACT CHATBOX */}
          <div className="mt-7 max-w-xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
            <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-slate-50 px-4 py-3">
              <p className="text-sm font-semibold text-gray-800">Ask Pearl Go anything</p>
              <p className="text-xs text-gray-500">Your AI trip planner is ready</p>
            </div>

            <div className="p-4">
              <div className="mb-3 rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-600 animate-fadeText">
                {changingTexts[textIndex]}
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={changingTexts[textIndex]}
                rows={2}
                className="min-h-[70px] w-full resize-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />

              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  aria-label="Use AI suggestion"
                  title="Use AI suggestion"
                  onClick={() => setMessage(changingTexts[textIndex])}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-2 text-xs font-semibold text-[#004aad] transition hover:bg-blue-100"
                >
                  <Sparkles size={15} />
                  AI Suggest
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Send message"
                    title="Send message"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#004aad] text-white shadow-md transition hover:scale-105 hover:bg-[#00337a]"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK BUTTONS */}
          <div className="mt-6 flex flex-wrap gap-3">
            {['Create a new trip', 'Inspire me where to go', 'Plan a road trip', 'Plan a last-minute escape'].map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  aria-label={item}
                  title={item}
                  onClick={() => handleQuickClick(item)}
                  className="rounded-full border border-blue-100 bg-[#e8f2ff] px-4 py-2 text-sm font-semibold text-[#004aad] transition hover:-translate-y-0.5 hover:bg-[#d8eaff]"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        {/* RIGHT VIDEO */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[520px] overflow-hidden rounded-[32px] border border-gray-200 bg-white p-2 shadow-2xl">
            <div className="absolute -inset-10 -z-10 rounded-full bg-blue-100 blur-3xl" />

            <div className="aspect-video overflow-hidden rounded-[24px]">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/8g9ccCkT-u0?autoplay=1&mute=1&controls=1"
                title="Pearl Go travel video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fadeText {
          animation: fadeText 0.5s ease-in-out;
        }

        @keyframes fadeText {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
