'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from '@/components/ChatMessage';

export default function Home() {
  const [tripCreated, setTripCreated] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      text: 'Hi 👋 I’m PearlGo AI. I can help you plan your Sri Lanka trip!',
      sender: 'bot',
    },
  ]);

  const suggestions = ['Best beaches in Sri Lanka', 'Cheap travel budget', 'Sigiriya history', 'Ella places to visit'];

  const tripOptions = [
    {
      title: 'Sigiriya',
      desc: 'Ancient rock fortress',
      image: '/sigiriya-srilanka.webp',
      link: '/select-trip/select-trip-sigiriya',
    },
    { title: 'Galle Fort', desc: 'Colonial coastal city', image: '/galle.jpg', link: '/select-trip/select-trip-galle' },
    {
      title: 'Pasikuda Beach',
      desc: 'Crystal-clear waters',
      image: '/pasikuda.jpg',
      link: '/select-trip/select-trip-pasikuda',
    },
    {
      title: 'Nine Arches Bridge',
      desc: 'Iconic railway bridge',
      image: '/nine-arches-bridge.jpg',
      link: '/select-trip/select-trip-nine-arches',
    },
    {
      title: 'Adam’s Peak',
      desc: 'Sacred sunrise hike',
      image: '/adams-peak.webp',
      link: '/select-trip/select-trip-adams-peak',
    },
    {
      title: 'Anuradhapura',
      desc: 'Ancient sacred city',
      image: '/anuradhapura.jpg',
      link: '/select-trip/select-trip-anuradhapura',
    },
  ];

  const handleSend = async (text?: string) => {
    const message = text || input;
    if (!message.trim() || typing) return;

    setMessages((prev) => [...prev, { text: message, sender: 'user' }]);
    setInput('');
    setTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: message }),
      });

      const data = await response.json();

      if (data.response) {
        setMessages((prev) => [...prev, { text: data.response, sender: 'bot' }]);
      } else {
        throw new Error('API Error');
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, I am having trouble connecting to the travel database. 🛑', sender: 'bot' },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      {/* HERO */}
      <div className="bg-gradient-to-r from-indigo-950 via-blue-900 to-indigo-800 text-white py-24 text-center px-6">
        <h1 className="text-5xl font-bold">Plan Your Sri Lanka Trip ✈️</h1>
        <p className="text-gray-200 mt-4 text-lg">AI-powered travel assistant for smarter journeys</p>

        <button
          type="button"
          onClick={() => setTripCreated(true)}
          className="mt-8 bg-white text-blue-900 px-8 py-3 rounded-full font-semibold shadow-lg"
        >
          Explore Destinations
        </button>
      </div>

      {/* DESTINATIONS */}
      <AnimatePresence>
        {tripCreated && (
          <motion.div className="max-w-6xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Popular Destinations</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {tripOptions.map((trip, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    width={500}
                    height={300}
                    className="h-52 w-full object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-blue-900">{trip.title}</h3>
                    <p className="text-gray-600 text-sm">{trip.desc}</p>

                    <Link href={trip.link}>
                      <button
                        type="button"
                        className="mt-4 w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition"
                      >
                        View Trip
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING CHAT BUTTON */}
      <button
        type="button"
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 bg-blue-900 text-white p-4 rounded-full shadow-xl"
        aria-label="Open chat"
      >
        {chatOpen ? <X /> : <MessageCircle />}
      </button>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-20 right-6 w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 flex items-center gap-2">
              <Sparkles size={18} />
              PearlGo AI Assistant
            </div>

            {/* SUGGESTIONS */}
            <div className="p-3 flex flex-wrap gap-2 bg-gray-50">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(s)}
                  className="text-xs bg-white px-2 py-1 rounded-full hover:bg-blue-50 shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* MESSAGES */}
            <div className="p-4 h-72 overflow-y-auto space-y-3 bg-white">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`text-sm p-2 rounded-lg max-w-[80%] ${
                    msg.sender === 'user' ? 'bg-blue-900 text-white ml-auto' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <ChatMessage text={msg.text} />
                </div>
              ))}

              {typing && <div className="text-xs text-gray-500 animate-pulse">PearlGo AI is typing...</div>}
            </div>

            {/* INPUT */}
            <div className="flex">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Sri Lanka..."
                className="flex-1 p-3 text-sm outline-none"
              />

              <button
                type="button"
                onClick={() => handleSend()}
                className="bg-blue-900 text-white px-4 flex items-center justify-center"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
