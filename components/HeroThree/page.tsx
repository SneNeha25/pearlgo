'use client';

import { Play } from 'lucide-react';

export default function DemoVideoSection() {
  return (
    <section className="w-full px-6 py-16 bg-white mt-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-semibold text-[#2b1730] mb-10">Stop losing hours. Watch me plan</h2>

        {/* VIDEO CARD (CENTERED + MEDIUM SIZE) */}
        <div className="mx-auto relative w-full md:w-[88%] lg:w-[75%] h-[300px] sm:h-[360px] md:h-[400px] rounded-3xl overflow-hidden shadow-xl border border-gray-200 group">
          {/* VIDEO */}
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/gfqPstRDjLo?autoplay=1&mute=1&controls=1&rel=0"
            title="Demo Video"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* PLAY ICON (HOVER) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition">
              <Play className="text-[#2b1730]" size={22} />
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center text-white text-sm">
            <span className="bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">Demo Video</span>

            <button
              type="button"
              aria-label="More videos"
              title="More videos"
              className="bg-white/80 text-[#2b1730] px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-white transition"
            >
              More videos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
