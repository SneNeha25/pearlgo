'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Plane, MapPin, Calendar, Send } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi 👋 I am PearlGo AI. Ask me anything about your Sri Lanka trip!' },
  ]);

  const [input, setInput] = useState('');
  const [price, setPrice] = useState(3200);

  const dailyPrice = Math.round(price / 18);

  const suggestions = [
    'Good morning',
    'What is the budget breakdown?',
    'Places near Sigiriya',
    'Best time to visit Sri Lanka?',
    'Add more cities to my trip',
    'Make this trip cheaper',
    'Remove flights from itinerary',
  ];

  const handleSend = (text?: string) => {
    const userText = (text || input).toLowerCase();
    if (!userText.trim()) return;

    let response = '';

    if (userText.includes('good morning') || userText.includes('good afternoon') || userText.includes('good evening')) {
      response = 'Good morning! 👋 How can I help you with your Sri Lanka trip today?';
    } else if (userText.includes('hi') || userText.includes('hello')) {
      response = 'Hi 👋 PearlGo here! Ready to plan your adventure!';
    } else if (userText.includes('budget') || userText.includes('cheaper')) {
      const newPrice = Math.round(price * 0.7);
      setPrice(newPrice);
      response = `💰 Here’s your optimized budget: $${newPrice}`;
    } else if (userText.includes('sigiriya') || userText.includes('near')) {
      response = '📍 Near Sigiriya: Dambulla Cave Temple, Minneriya National Park, Pidurangala Rock 🏔️';
    } else if (userText.includes('remove flights')) {
      response = '✈️ Flights removed. Switched to scenic routes 🚆';
    } else if (userText.includes('add cities')) {
      response = '🌆 Added Kandy + Ella + Galle to your itinerary!';
    } else {
      response = '🤖 I can help with budget, places, routes & itinerary!';
    }

    setMessages((prev) => [...prev, { role: 'user', text: text || input }, { role: 'ai', text: response }]);

    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-16 px-6">
      <div className="max-w-7xl mx-auto flex rounded-3xl overflow-hidden shadow-2xl border bg-white/70 backdrop-blur-xl">
        {/* LEFT CHAT PANEL */}
        <div className="w-[380px] border-r bg-white/60 flex flex-col">
          {/* HEADER */}
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-indigo-700">🌍 PearlGo AI</h2>
            <p className="text-sm text-gray-500">Your Sri Lanka trip assistant</p>
          </div>

          {/* SUGGESTIONS */}
          <div className="p-3 space-y-2 border-b">
            <p className="text-xs text-gray-400 px-2">Suggested questions</p>

            {suggestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="w-full text-left text-sm px-4 py-2 rounded-full bg-white hover:bg-gray-100 shadow-sm transition"
              >
                💬 {q}
              </button>
            ))}
          </div>

          {/* CHAT */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`px-4 py-2 rounded-2xl text-sm shadow-sm w-fit max-w-[85%] ${
                  msg.role === 'ai'
                    ? 'bg-gray-100 text-gray-700'
                    : 'ml-auto bg-gradient-to-r from-indigo-600 to-blue-600 text-white'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="p-3 border-t flex gap-2 bg-white/70">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about budget, places..."
              className="flex-1 px-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Message input"
            />

            <button
              onClick={() => handleSend()}
              aria-label="Send message"
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full transition"
            >
              <Send size={16} />
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 p-8 space-y-8 overflow-y-auto">
          {/* HERO */}
          <div className="bg-white rounded-3xl shadow-lg p-6 flex gap-6 items-center hover:shadow-2xl transition">
            <div className="relative w-52 h-36 rounded-2xl overflow-hidden">
              <Image src="/sigiriya-srilanka.webp" alt="Sigiriya" fill className="object-cover" />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">Sri Lanka Adventure Escape 🇱🇰</h1>

              <div className="flex gap-5 text-sm text-gray-500 mt-3">
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> 18 Days
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> 5 Cities
                </span>
                <span className="flex items-center gap-1">
                  <Plane size={14} /> Mixed Travel
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-2xl px-6 py-4 text-center">
              <p className="text-xs opacity-80">Total</p>
              <p className="text-2xl font-bold">${price}</p>
              <p className="text-xs opacity-80">${dailyPrice}/day</p>
            </div>
          </div>

          {/* SIGIRIYA INFO */}
          <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-gray-800">🏔 Sigiriya Rock Fortress</h2>

            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              Explore Sigiriya, Pidurangala Rock, Dambulla Cave Temple, and safari parks.
            </p>

            <iframe
              src="https://www.google.com/maps?q=Sigiriya,Sri%20Lanka&output=embed"
              className="w-full h-72 mt-5 rounded-2xl border"
              loading="lazy"
            />

            {/* ✅ BOOK NOW BUTTON */}
            <div className="mt-6 flex justify-end">
              <Link href="/book-now">
                <button
                  onClick={() => alert('Booking started! 🚀')}
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:scale-105 hover:shadow-2xl transition"
                  aria-label="Book this trip"
                >
                  Book Now →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
