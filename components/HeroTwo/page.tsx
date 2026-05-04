'use client';

import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import Link from 'next/link';

export default function StatsBanner() {
  const target = 162490; // final number
  const duration = 2000; // animation time (ms)

  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16); // ~60fps

    const counter = setInterval(() => {
      start += increment;

      if (start >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, []);

  // format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <section className="w-full px-6 pt-20">
      <div className="max-w-7xl mx-auto bg-blue-50 rounded-3xl shadow-lg px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* LEFT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2b1730] leading-tight">
            Your trip in minutes,
            <br />
            not weeks.
          </h2>

          <p className="mt-4 text-gray-700 text-lg">Plan your next trip with me and save hours of planning</p>
          <Link
            href="/plan-trip"
            className="mt-6 inline-flex items-center gap-2 bg-[#004aad] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-500 hover:scale-105 transition-all duration-200"
          >
            <Send size={16} />
            Plan my trip
          </Link>
        </div>

        {/* RIGHT (Animated Counter) */}
        <div className="text-center md:text-right">
          <h3 className="text-5xl md:text-6xl font-extrabold text-[#2b1730] tracking-tight">{formatNumber(count)}</h3>
          <p className="mt-2 text-gray-700 text-lg">Trips Planned</p>
        </div>
      </div>
    </section>
  );
}
