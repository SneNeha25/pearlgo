'use client';

import { MessageSquare, Sparkles } from 'lucide-react';

export default function PearlGoChatbot() {
  return (
    <section className="w-full bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl mt-10 mb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 text-slate-700 font-semibold">
            <Sparkles size={16} /> Smart Travel Chat
          </div>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900">Chat with PearlGo AI</h2>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Ask for recommendations, budget plans, or local tips and get instant Sri Lanka travel guidance.
          </p>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-sky-50 to-blue-100 p-6 border border-slate-200 shadow-sm max-w-md w-full">
          <div className="flex items-center gap-3 text-slate-900 font-semibold mb-4">
            <MessageSquare size={20} /> PearlGo Assistant
          </div>
          <div className="space-y-3 text-sm text-slate-700">
            <p>• Ask for a 3-day beach itinerary.</p>
            <p>• Find the best train route to Ella.</p>
            <p>• Get local food and transport tips.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
