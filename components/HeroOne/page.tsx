'use client';

import { useState } from 'react';
import { Send, Sparkles, Bot, MessageCircle, Plane, MapPin, Compass, Globe } from 'lucide-react';

const suggestions = [
  'Plan a 3-day Sri Lanka beach trip',
  'Budget travel to Ella',
  'Romantic weekend in Kandy',
  'Colombo city tour plan',
];

const inferenceEngine: Record<string, string> = {
  hi: 'Hello 👋 Welcome to PearlGo AI Travel Assistant!',
  'good morning': 'Good morning! Ready to plan your next adventure? ☀️',
  thanks: 'Anytime! Happy to help you plan your journey ✈️',
  sigiriya: '🦁 Sigiriya Rock Fortress + Dambulla Cave Temple 🏛 UNESCO world heritage sites!',
  price: '💰 Travel prices depend on location, duration, and transport. Tell me your plan and I’ll calculate it!',
  budget: '🧾 I can help you plan a budget-friendly trip in Sri Lanka under any budget 💸',
  transport: '🚗 Options: car, van, train, or tuk-tuk depending on your trip style!',
  thank: "You're welcome! Let me know if you have any travel questions. 😊",

  beach: '🏖 Mirissa • Unawatuna • Bentota 🌊',
  ella: '🚆 Ella: Nine Arches Bridge + Little Adam’s Peak 🌄',
  kandy: '🏞 Kandy: Temple of Tooth + Lake Walk 🎭',
};

function getBotReply(input: string) {
  const text = input.toLowerCase();

  for (const key in inferenceEngine) {
    if (text.includes(key)) return inferenceEngine[key];
  }

  return "🤖 I'm learning more Sri Lanka travel ideas...";
}

export default function HeroSection() {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([{ role: 'bot', text: '👋 Hi! I am PearlGo AI Travel Assistant.' }]);

  const handleSend = () => {
    if (!message.trim()) return;

    const reply = getBotReply(message);

    setChat((prev) => [...prev, { role: 'user', text: message }, { role: 'bot', text: reply }]);

    setMessage('');
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-sky-100 px-6 py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute w-[500px] h-[500px] bg-blue-200/30 blur-3xl rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-200/20 blur-3xl bottom-[-150px] right-[-150px]" />

      {/* Floating icons */}
      <div className="absolute top-20 left-20 text-blue-300/30 animate-float">
        <Plane size={60} />
      </div>
      <div className="absolute bottom-32 left-40 text-sky-300/30 animate-floatSlow">
        <MapPin size={50} />
      </div>
      <div className="absolute top-32 right-32 text-indigo-300/30 animate-float">
        <Compass size={55} />
      </div>
      <div className="absolute bottom-20 right-20 text-blue-300/30 animate-floatSlow">
        <Globe size={65} />
      </div>

      {/* HERO */}
      <div className="text-center max-w-4xl z-10">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-blue-100 text-[#004aad] font-semibold">
            <Sparkles size={16} />
            AI Travel Assistant – Sri Lanka
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold text-gray-900">
            Plan Your Dream Trips <br />
            with <span className="text-[#004aad]">PearlGo AI</span>
          </h1>

          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Explore beaches, mountains & culture with smart AI travel planning ✨
          </p>
        </div>

        {/* CHAT */}
        {open && (
          <div className="mx-auto w-full max-w-md bg-white/50 backdrop-blur-xl border border-white rounded-3xl shadow-xl overflow-hidden animate-fadeIn">
            {/* messages */}
            <div className="h-[320px] overflow-y-auto p-4 space-y-3 text-left">
              {chat.map((c, i) => (
                <div key={i} className={`flex ${c.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                      c.role === 'user'
                        ? 'bg-[#004aad] text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                    }`}
                  >
                    {c.role === 'bot' && (
                      <div className="flex items-center gap-1 text-xs text-[#004aad] font-semibold mb-1">
                        <Bot size={14} /> PearlGo AI
                      </div>
                    )}
                    {c.text}
                  </div>
                </div>
              ))}
            </div>

            {/* input */}
            <div className="p-3 border-t flex gap-2 bg-white/50">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask your travel question..."
                className="flex-1 resize-none rounded-xl bg-white px-3 py-2 text-sm outline-none shadow-sm focus:ring-2 focus:ring-blue-200"
                rows={2}
              />

              <button
                type="button"
                onClick={handleSend}
                aria-label="Send message"
                title="Send message"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#004aad] text-white hover:scale-110 transition"
              >
                <Send size={16} />
              </button>
            </div>

            {/* suggestions */}
            <div className="px-3 pb-4 flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setMessage(s)}
                  className="text-[11px] px-3 py-1 rounded-full bg-blue-50 text-[#004aad] hover:bg-blue-100 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FLOAT BUTTON */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Open chat assistant"
        title="Open chat assistant"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#004aad] text-white shadow-xl flex items-center justify-center hover:scale-110 transition"
      >
        <MessageCircle />
      </button>

      {/* animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-floatSlow {
          animation: float 9s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
