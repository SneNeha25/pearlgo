'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const destinations = [
  {
    title: 'Family - Ella Trip',
    image: '/place1.jpg',
  },
  {
    title: 'Couples - Mirrisa',
    image: '/place2.jpg',
  },
  {
    title: 'Road Trip - Kandy',
    image: '/place3.webp',
  },
  {
    title: 'Beach Escape - Unawatuna',
    image: '/place4.webp',
  },
];

export default function DestinationsSection() {
  return (
    <section className="w-full px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* TITLE */}
        <h2 className="text-2xl md:text-4xl font-bold text-[#2b1730] mb-10">Where to go next</h2>

        {/* GRID (4 CARDS) */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              {/* IMAGE */}
              <div className="relative w-full h-56 rounded-3xl overflow-hidden shadow-md">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* TEXT */}
              <div className="mt-4">
                <p className="text-gray-600 text-sm">{item.title}</p>

                <button
                  type="button"
                  aria-label="Start planning"
                  title="Start planning"
                  className="mt-2 inline-flex items-center gap-2 text-[#2b1730] font-medium hover:gap-3 transition-all"
                >
                  Start planning
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
