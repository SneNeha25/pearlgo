'use client';
import Link from 'next/link';
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function Home() {
  const [tripCreated, setTripCreated] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Hi 👋 How can I help you plan your trip?', sender: 'bot' }]);
  const [input, setInput] = useState('');

  const tripOptions = [
    {
      title: 'Sigiriya',
      description: 'Beaches, hills & culture',
      image: '/sigiriya-srilanka.webp',
    },
    {
      title: 'Galle Fort',
      description: 'Galle Fort',
      image: '/galle.jpg',
    },
    {
      title: 'Pasikuda Beach',
      description: 'Relaxing beach vibes',
      image: '/pasikuda.jpg',
    },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);

    let reply = 'I can help you plan your trip 😊';

    if (input.toLowerCase().includes('budget')) {
      reply = 'Tell me your budget, I’ll suggest the best trips 💰';
    } else if (input.toLowerCase().includes('beach')) {
      reply = 'Pasikuda & Arugam Bay are perfect for beaches 🏝️';
    } else if (input.toLowerCase().includes('city')) {
      reply = 'Galle is great for a modern city experience 🌆';
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: reply, sender: 'bot' }]);
    }, 500);

    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mb-24">
      {/* HERO */}
      <div className="bg-[#00337a] text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Plan Your Dream Trip ✈️</h1>
        <p className="text-gray-200 mb-8 text-lg">Smart travel planning made simple & beautiful</p>

        <button
          onClick={() => setTripCreated(true)}
          className="bg-white text-[#00337a] px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
        >
          Create New Trip
        </button>
      </div>

      {/* TRIP OPTIONS */}
      {tripCreated && (
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#00337a]">Choose Your Destination</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {tripOptions.map((trip, index) => (
              <div key={index} className="rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition">
                {/* IMAGE */}
                <img src={trip.image} alt={trip.title} className="h-56 w-full object-cover" />

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#00337a]">{trip.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{trip.description}</p>

                  <Link href="/select-trip-sigiriya">
                    <button className="mt-4 w-full bg-[#00337a] text-white py-2 rounded-lg hover:bg-[#00275c] transition">
                      Select Trip
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHAT BUTTON */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-[#00337a] text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
        >
          {chatOpen ? <X /> : <MessageCircle />}
        </button>
      </div>

      {/* CHATBOX */}
      {chatOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
          <div className="bg-[#00337a] text-white p-4 font-semibold">Travel Assistant 🤖</div>

          <div className="p-4 h-64 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm max-w-[80%] ${
                  msg.sender === 'user' ? 'bg-[#00337a] text-white ml-auto' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 p-2 text-sm outline-none"
            />
            <button onClick={handleSend} className="bg-[#00337a] text-white px-4">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
