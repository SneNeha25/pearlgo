'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Plane, MapPin, Calendar, Send, Star } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Message = {
  role: 'ai' | 'user';
  text: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Hi 👋 I am PearlGo AI. Ask me anything about your Sri Lanka trip!' },
  ]);

  const [input, setInput] = useState('');
  const [price, setPrice] = useState(7900);

  const dailyPrice = Math.round(price / 16);

  const suggestions = [
    'What is the budget breakdown?',
    'Places near Galle Fort',
    'Best time to visit Sri Lanka?',
    'Add more cities to my trip',
    'Make this trip cheaper',
    'Remove flights from itinerary',
  ];

  const handleSend = (text?: string) => {
    const userText = (text || input).toLowerCase().trim();
    if (!userText) return;

    let response = '';

    if (userText.includes('hi')) {
      response = 'Hi 👋 PearlGo here! Ready to plan your adventure!';
    } else if (userText.includes('budget') || userText.includes('cheaper')) {
      const newPrice = Math.round(price * 0.7);
      setPrice(newPrice);
      response = `💰 Optimized budget: $${newPrice}`;
    } else if (userText.includes('galle') || userText.includes('fort')) {
      response = '📍 Galle Fort, Unawatuna Beach, Lighthouse, Jungle Beach 🌊';
    } else if (userText.includes('remove flights')) {
      response = '✈️ Switched to scenic routes 🚆';
    } else if (userText.includes('add cities')) {
      response = '🌆 Added Kandy + Ella + Mirissa!';
    } else {
      response = '🤖 I can help with budget, places & itinerary!';
    }

    setMessages((prev) => [...prev, { role: 'user', text: text || input }, { role: 'ai', text: response }]);

    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 pt-20 pb-28">
      <div className="max-w-7xl mx-auto flex rounded-3xl overflow-hidden shadow-2xl bg-white/40 backdrop-blur-2xl">
        {/* LEFT CHAT */}
        <div className="w-[380px] flex flex-col bg-white/30 backdrop-blur-xl">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="p-6">
            <h2 className="text-2xl font-bold text-indigo-700">🌍 PearlGo AI</h2>
            <p className="text-sm text-gray-500">Sri Lanka trip assistant</p>
          </motion.div>

          <div className="p-3 space-y-2">
            {suggestions.map((q, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSend(q)}
                className="w-full text-left text-sm px-4 py-2 rounded-2xl bg-white/60 hover:bg-white shadow-sm transition"
              >
                💬 {q}
              </motion.button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`px-4 py-2 rounded-2xl text-sm shadow-md w-fit max-w-[85%] ${
                  msg.role === 'ai'
                    ? 'bg-white/70 text-gray-700'
                    : 'ml-auto bg-gradient-to-r from-indigo-600 to-blue-600 text-white'
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
          </div>

          <div className="p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={() => handleSend()}
              aria-label="Send message"
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full transition shadow-lg hover:scale-105"
            >
              <Send size={16} />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 p-8 space-y-8 overflow-y-auto">
          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 flex gap-6 items-center shadow-xl"
          >
            <div className="relative w-52 h-36 rounded-2xl overflow-hidden">
              <Image src="/galle.jpg" alt="Galle Fort" fill className="object-cover" />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">Sri Lanka Coastal Adventure 🇱🇰</h1>

              <div className="flex gap-5 text-sm text-gray-500 mt-3">
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> 18 Days
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> 5 Cities
                </span>
                <span className="flex items-center gap-1">
                  <Plane size={14} /> Mixed
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-2xl px-6 py-4 text-center shadow-lg">
              <p className="text-xs opacity-80">Total</p>
              <p className="text-2xl font-bold">${price}</p>
              <p className="text-xs opacity-80">${dailyPrice}/day</p>
            </div>
          </motion.div>

          {/* MAP + GALLE INFO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-gray-800">🏰 Galle Fort</h2>

            <p className="text-gray-600 mt-2 text-sm">
              A UNESCO World Heritage Site blending Dutch colonial history with stunning coastal views.
            </p>

            <iframe
              src="https://www.google.com/maps?q=Galle%20Fort,Sri%20Lanka&output=embed"
              className="w-full h-72 mt-5 rounded-2xl"
              loading="lazy"
            />

            {/* ATTRACTION SECTION */}
            <div className="mt-6 relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-white/50 shadow-lg">
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="p-2 rounded-full bg-yellow-100">
                  <Star className="text-yellow-500" size={18} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800">Why visit Galle Fort?</h3>
                  <p className="text-xs text-gray-500">Sri Lanka’s Coastal Heritage Gem</p>
                </div>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed relative z-10">
                <span className="font-semibold text-indigo-700">Galle Fort</span> is a beautifully preserved colonial
                fortress overlooking the Indian Ocean, filled with charming streets, cafés, and history 🌊
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                <div className="flex items-start gap-2 bg-white/60 p-3 rounded-xl shadow-sm hover:shadow-md transition">
                  <span className="text-lg">🏰</span>
                  <p className="text-sm text-gray-700">Dutch colonial architecture & ramparts</p>
                </div>

                <div className="flex items-start gap-2 bg-white/60 p-3 rounded-xl shadow-sm hover:shadow-md transition">
                  <span className="text-lg">🌊</span>
                  <p className="text-sm text-gray-700">Ocean sunset views from fort walls</p>
                </div>

                <div className="flex items-start gap-2 bg-white/60 p-3 rounded-xl shadow-sm hover:shadow-md transition">
                  <span className="text-lg">☕</span>
                  <p className="text-sm text-gray-700">Trendy cafés, boutiques & art shops</p>
                </div>

                <div className="flex items-start gap-2 bg-white/60 p-3 rounded-xl shadow-sm hover:shadow-md transition">
                  <span className="text-lg">🚶</span>
                  <p className="text-sm text-gray-700">Perfect walking experience inside old city walls</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between relative z-10">
                <div className="text-xs text-gray-500">⏱ Recommended visit: 2–4 hours</div>

                <div className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs shadow-md">Must Visit ⭐</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Link href="/new-trip">
                <button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition">
                  Book Now →
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
