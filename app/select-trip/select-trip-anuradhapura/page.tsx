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
  const [price, setPrice] = useState(5200);

  const dailyPrice = Math.round(price / 10);

  const suggestions = [
    'What is the budget breakdown?',
    'Tell me about Anuradhapura',
    'Best ancient cities in Sri Lanka?',
    'Add cultural sites to itinerary',
    'Make this trip cheaper',
    'What is sacred city history?',
  ];

  const handleSend = (text?: string) => {
    const userText = (text || input).toLowerCase().trim();
    if (!userText) return;

    let response = '';

    if (userText.includes('hi')) {
      response = 'Hi 👋 PearlGo here! Ready for your cultural journey!';
    } else if (userText.includes('budget') || userText.includes('cheaper')) {
      const newPrice = Math.round(price * 0.7);
      setPrice(newPrice);
      response = `💰 Optimized budget: $${newPrice}`;
    } else if (userText.includes('anuradhapura') || userText.includes('sacred')) {
      response = '🏛️ Anuradhapura — ancient sacred city with stupas, ruins & Buddhist heritage!';
    } else if (userText.includes('history')) {
      response = '📜 One of the oldest continuously inhabited cities in the world!';
    } else if (userText.includes('add cities')) {
      response = '🌆 Added Polonnaruwa + Sigiriya + Dambulla!';
    } else {
      response = '🤖 I can help with history, culture & itinerary!';
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
            <p className="text-sm text-gray-500">Sri Lanka cultural trip assistant</p>
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
              <Image src="/anuradhapura.jpg" alt="Anuradhapura Sacred City" fill className="object-cover" />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">Anuradhapura Sacred City 🏛️</h1>

              <div className="flex gap-5 text-sm text-gray-500 mt-3">
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> 2–3 Days
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> Cultural Triangle
                </span>
                <span className="flex items-center gap-1">
                  <Plane size={14} /> Heritage Route
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-2xl px-6 py-4 text-center shadow-lg">
              <p className="text-xs opacity-80">Total</p>
              <p className="text-2xl font-bold">${price}</p>
              <p className="text-xs opacity-80">${dailyPrice}/day</p>
            </div>
          </motion.div>

          {/* MAP + INFO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-gray-800">🏛️ Anuradhapura</h2>

            <p className="text-gray-600 mt-2 text-sm">
              One of the world’s oldest ancient capitals, famous for stupas, monasteries, and sacred Buddhist sites.
            </p>

            <iframe
              src="https://www.google.com/maps?q=Anuradhapura%20Sri%20Lanka&output=embed"
              className="w-full h-72 mt-5 rounded-2xl"
              loading="lazy"
            />

            {/* ATTRACTION */}
            <div className="mt-6 relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-white/50 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-yellow-100">
                  <Star className="text-yellow-500" size={18} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800">Why visit Anuradhapura?</h3>
                  <p className="text-xs text-gray-500">Ancient Spiritual & Historical Capital</p>
                </div>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-indigo-700">Anuradhapura</span> is a UNESCO heritage city filled
                with ancient stupas, sacred Bodhi tree, and ruins of Sri Lankan civilization 🏛️🌿
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2 bg-white/60 p-3 rounded-xl shadow-sm">
                  <span>🌳</span>
                  <p className="text-sm text-gray-700">Sri Maha Bodhi (sacred tree)</p>
                </div>

                <div className="flex items-start gap-2 bg-white/60 p-3 rounded-xl shadow-sm">
                  <span>🏛️</span>
                  <p className="text-sm text-gray-700">Ancient stupas & ruins</p>
                </div>

                <div className="flex items-start gap-2 bg-white/60 p-3 rounded-xl shadow-sm">
                  <span>📜</span>
                  <p className="text-sm text-gray-700">Over 2,000 years history</p>
                </div>

                <div className="flex items-start gap-2 bg-white/60 p-3 rounded-xl shadow-sm">
                  <span>🕊️</span>
                  <p className="text-sm text-gray-700">Peaceful spiritual atmosphere</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="text-xs text-gray-500">⏱ Recommended stay: 2–3 days</div>
                <div className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs">Must Visit ⭐</div>
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
