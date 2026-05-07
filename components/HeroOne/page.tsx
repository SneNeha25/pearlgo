'use client';

import { useState } from 'react';
import { Send, Sparkles, Bot, MessageCircle, Plane, MapPin, Globe, ArrowRight } from 'lucide-react';
import ChatMessage from '../ChatMessage';

const suggestions = [
  '3-day Sri Lanka beach tour',
  'Luxury honeymoon package',
  'Ella train journey',
  'Colombo city guide',
];

export default function HeroSection() {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);

  const [chat, setChat] = useState([
    {
      role: 'bot',
      text: '👋 Welcome to PearlGo AI Travel Assistant. Ask me anything about Sri Lanka travel, hotels, tours, or destinations.',
    },
  ]);

  const handleSend = async (suggestion?: string) => {
    const textToSend = suggestion || message;

    if (!textToSend.trim() || typing) return;

    setChat((prev) => [...prev, { role: 'user', text: textToSend }]);

    setMessage('');
    setTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: textToSend,
        }),
      });

      const data = await response.json();

      if (data.response) {
        setChat((prev) => [...prev, { role: 'bot', text: data.response }]);
      }
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          role: 'bot',
          text: 'Unable to connect right now. Please try again later.',
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f5f9ff] min-h-screen flex items-center justify-center px-4 py-24">
      {/* Background Effects */}
      <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-3xl" />

      {/* Floating Icons */}
      <div className="hidden lg:block absolute top-24 left-20 text-blue-200 animate-float">
        <Plane size={70} strokeWidth={1.5} />
      </div>

      <div className="hidden lg:block absolute bottom-24 left-28 text-sky-200 animate-floatSlow">
        <MapPin size={60} strokeWidth={1.5} />
      </div>

      <div className="hidden lg:block absolute top-32 right-24 text-indigo-200 animate-float">
        <Globe size={75} strokeWidth={1.5} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
        {/* Top Section */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white border border-blue-100 shadow-sm px-5 py-2 rounded-full text-[#004aad] font-medium text-sm">
            <Sparkles size={16} />
            AI Powered Travel Planning
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
            Explore Sri Lanka <br />
            with <span className="text-[#004aad]">PearlGo AI</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
            Discover personalized travel plans, destination guides, hotel suggestions, and unforgettable experiences
            powered by intelligent AI assistance.
          </p>
        </div>

        {/* Chat Container */}
        {open && (
          <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/70 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,74,173,0.10)]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-gray-100 bg-white/60">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#004aad] text-white flex items-center justify-center shadow-lg">
                  <Bot size={24} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">PearlGo AI Assistant</h3>

                  <p className="text-sm text-gray-500">Smart travel support for Sri Lanka</p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2 text-sm text-[#004aad] font-medium">
                AI Online
                <span className="w-2 h-2 rounded-full bg-green-500" />
              </div>
            </div>

            {/* Messages */}
            <div className="h-[560px] overflow-y-auto px-4 md:px-8 py-8 space-y-6 bg-gradient-to-b from-transparent to-blue-50/30">
              {chat.map((c, i) => (
                <div key={i} className={`flex ${c.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[92%] md:max-w-[70%] rounded-3xl px-5 py-4 shadow-sm text-sm md:text-[15px] leading-relaxed ${
                      c.role === 'user'
                        ? 'bg-[#004aad] text-white rounded-br-md'
                        : 'bg-white border border-gray-100 text-gray-800 rounded-bl-md'
                    }`}
                  >
                    {c.role === 'bot' && (
                      <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#004aad]">
                        <Bot size={14} />
                        PearlGo AI
                      </div>
                    )}

                    <ChatMessage text={c.text} />
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-3xl rounded-bl-md px-5 py-3 shadow-sm text-sm text-gray-500 animate-pulse">
                    PearlGo AI is generating a response...
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="px-4 md:px-8 pb-5 flex flex-wrap gap-3">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(s)}
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-blue-100 text-[#004aad] text-sm font-medium hover:bg-blue-50 transition-all duration-300 shadow-sm"
                >
                  {s}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 bg-white/80 px-4 md:px-8 py-5">
              <div className="flex items-end gap-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about destinations, hotels, tours, or travel plans..."
                  rows={2}
                  className="flex-1 resize-none rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm md:text-base outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100 transition shadow-sm"
                />

                <button
                  type="button"
                  onClick={() => handleSend()}
                  aria-label="Send message"
                  title="Send message"
                  className="w-14 h-14 rounded-2xl bg-[#004aad] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Chat Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Open chat assistant"
        title="Open chat assistant"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#004aad] text-white flex items-center justify-center shadow-[0_10px_40px_rgba(0,74,173,0.35)] hover:scale-110 transition-all duration-300"
      >
        <MessageCircle size={28} />
      </button>

      {/* Animations */}
      <style jsx>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-floatSlow {
          animation: float 9s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-18px);
          }

          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  );
}
