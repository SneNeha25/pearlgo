'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Send, Sparkles, Bot, MessageCircle, Plane, MapPin, Globe, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const suggestions = [
  'Sigiriya 😻',
  'Ella train journey 😇',
  'Kandy temple ✈️',
  'Mirissa beach 😍',
  'Yala safari 🤩',
  'Colombo city guide ❤️',
];

const travelAnswers: Record<
  string,
  {
    title: string;
    text: string;
    image: string;
  }
> = {
  sigiriya: {
    title: 'Sigiriya Rock Fortress',
    text: 'Sigiriya 😍 is one of the most famous historical places in Sri Lanka. It is an ancient rock fortress built by King Kashyapa. Visitors can climb the rock, see beautiful fresco paintings, water gardens, and enjoy amazing views from the top.',
    image: 'https://www.barcelo.com/guia-turismo/wp-content/uploads/2024/03/sgiriya.jpg',
  },

  ella: {
    title: 'Ella Train Journey 😍',
    text: 'Ella 😍 is a beautiful mountain village in Sri Lanka famous for tea plantations, Nine Arches Bridge, Little Adam’s Peak, and scenic train rides through the hills.',
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1200&auto=format&fit=crop',
  },

  kandy: {
    title: 'Kandy Temple of the Tooth 😍',
    text: 'Kandy 😍 is a cultural city in Sri Lanka. The Temple of the Tooth Relic is one of the most sacred Buddhist temples in the country and attracts many tourists every year.',
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1200&auto=format&fit=crop',
  },

  mirissa: {
    title: 'Mirissa Beach 😍',
    text: 'Mirissa 😍 is a famous beach destination in Sri Lanka known for whale watching, surfing, relaxing sunsets, and golden beaches.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
  },

  yala: {
    title: 'Yala National Park 😍',
    text: 'Yala National Park 😍 is famous for wildlife safaris. Visitors can see elephants, leopards, crocodiles, birds, and many other animals.',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1200&auto=format&fit=crop',
  },

  colombo: {
    title: 'Colombo City Guide 😍',
    text: 'Colombo is the commercial capital of Sri Lanka. It offers shopping malls, restaurants, nightlife, beaches, hotels, and historical places.',
    image: 'https://images.unsplash.com/photo-1588591794919-7f1b9a4a7f48?q=80&w=1200&auto=format&fit=crop',
  },

  // EXTRA QUESTIONS & ANSWERS

  morning: {
    title: 'Good Morning 🌞',
    text: 'Good Morning 👋 Welcome to PearlGo AI. Ready to explore beautiful destinations in Sri Lanka today?',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
  },

  thankyou: {
    title: 'You’re Welcome ❤️',
    text: 'You’re always welcome 😊 I’m happy to help you plan your Sri Lanka adventure with PearlGo AI.',
    image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1200&auto=format&fit=crop',
  },

  budget: {
    title: 'Sri Lanka Budget Planning 💰',
    text: 'A budget trip in Sri Lanka can cost around $25-$40 per day. A mid-range trip may cost $60-$120 per day including hotels, food, and transport.',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop',
  },

  hotels: {
    title: 'Best Hotels in Sri Lanka 🏨',
    text: 'Sri Lanka offers luxury resorts, beach hotels, mountain villas, and budget stays in destinations like Colombo, Ella, Kandy, and Mirissa.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
  },

  food: {
    title: 'Sri Lankan Food 🍛',
    text: 'Sri Lankan food is full of flavor. Popular dishes include rice and curry, kottu roti, hoppers, string hoppers, seafood, and spicy sambols.',
    image: 'https://images.unsplash.com/photo-1604908554027-4d2b6e2f0b98?q=80&w=1200&auto=format&fit=crop',
  },

  transport: {
    title: 'Transport in Sri Lanka 🚆',
    text: 'You can travel around Sri Lanka using trains, buses, tuk tuks, taxis, and private vehicles. Train journeys to Ella and Kandy are very popular.',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop',
  },

  beaches: {
    title: 'Beautiful Beaches 🌊',
    text: 'Sri Lanka has amazing beaches like Mirissa, Unawatuna, Bentota, Arugam Bay, and Nilaveli perfect for surfing and relaxing.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
  },
};

type ChatType = {
  role: 'user' | 'bot';
  text: string;
  image?: string;
};

export default function HeroSection() {
  const { user } = useAuth();

  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [chat, setChat] = useState<ChatType[]>([
    {
      role: 'bot',
      text: '👋 Welcome to PearlGo AI Travel Assistant. Ask me about Sri Lanka destinations, beaches, tours, hotels, and travel experiences.',
    },
  ]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [chat, typing]);

  // Auto reply system
  const getBotResponse = (text: string) => {
    const lower = text.toLowerCase();

    // DESTINATIONS

    if (lower.includes('sigiriya')) {
      return travelAnswers.sigiriya;
    }

    if (lower.includes('ella')) {
      return travelAnswers.ella;
    }

    if (lower.includes('kandy')) {
      return travelAnswers.kandy;
    }

    if (lower.includes('mirissa')) {
      return travelAnswers.mirissa;
    }

    if (lower.includes('yala')) {
      return travelAnswers.yala;
    }

    if (lower.includes('colombo')) {
      return travelAnswers.colombo;
    }

    // EXTRA QUESTIONS

    if (
      lower.includes('good morning') ||
      lower.includes('morning') ||
      lower.includes('hi') ||
      lower.includes('hello')
    ) {
      return travelAnswers.morning;
    }

    if (lower.includes('thank you') || lower.includes('thanks')) {
      return travelAnswers.thankyou;
    }

    if (lower.includes('budget') || lower.includes('cost') || lower.includes('cheap trip')) {
      return travelAnswers.budget;
    }

    if (lower.includes('hotel') || lower.includes('hotels') || lower.includes('stay')) {
      return travelAnswers.hotels;
    }

    if (lower.includes('food') || lower.includes('restaurant') || lower.includes('eat')) {
      return travelAnswers.food;
    }

    if (lower.includes('transport') || lower.includes('train') || lower.includes('bus') || lower.includes('travel')) {
      return travelAnswers.transport;
    }

    if (lower.includes('beach') || lower.includes('beaches')) {
      return travelAnswers.beaches;
    }

    // DEFAULT RESPONSE

    return {
      title: 'PearlGo AI',
      text: 'I can help you discover Sri Lanka destinations, hotels, beaches, safaris, food, transport, and travel budgets. Try asking about Sigiriya, Ella, Mirissa, hotels, or budget plans.',
      image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1200&auto=format&fit=crop',
    };
  };

  // Send message
  const handleSend = async (suggestion?: string) => {
    const textToSend = suggestion || message;

    if (!textToSend.trim() || typing) return;

    setChat((prev) => [
      ...prev,
      {
        role: 'user',
        text: textToSend,
      },
    ]);

    setMessage('');
    setTyping(true);

    setTimeout(() => {
      const response = getBotResponse(textToSend);

      setChat((prev) => [
        ...prev,
        {
          role: 'bot',
          text: response.text,
          image: response.image,
        },
      ]);

      setTyping(false);
    }, 1200);
  };

  return (
    <section className="relative overflow-hidden bg-[#f5f9ff] min-h-screen flex items-center justify-center px-4 py-24 mt-12">
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white border border-blue-100 shadow-sm px-5 py-2 rounded-full text-[#004aad] font-medium text-sm">
            <Sparkles size={16} />
            AI Powered Travel Planning
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Explore Sri Lanka <br />
            with <span className="text-[#004aad]">PearlGo AI</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
            Discover destinations, hotels, train journeys, beaches, and unforgettable Sri Lankan experiences powered by
            AI.
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
                    className={`max-w-[95%] md:max-w-[70%] rounded-3xl overflow-hidden shadow-sm ${
                      c.role === 'user'
                        ? 'bg-[#004aad] text-white rounded-br-md px-5 py-4'
                        : 'bg-white border border-gray-100 text-gray-800 rounded-bl-md'
                    }`}
                  >
                    {/* Bot Header */}
                    {c.role === 'bot' && (
                      <>
                        <div className="flex items-center gap-2 px-5 pt-4 mb-3 text-xs font-semibold text-[#004aad]">
                          <Bot size={14} />
                          PearlGo AI
                        </div>

                        {/* Image */}
                        {c.image && (
                          <div className="relative w-full h-60">
                            <Image src={c.image} alt="Travel destination" fill className="object-cover" unoptimized />
                          </div>
                        )}
                      </>
                    )}

                    {/* Message */}
                    <div className={`text-sm md:text-[15px] leading-relaxed ${c.role === 'bot' ? 'px-5 py-4' : ''}`}>
                      {c.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing */}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-3xl rounded-bl-md px-5 py-3 shadow-sm text-sm text-gray-500 animate-pulse">
                    PearlGo AI is generating a response...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-4 md:px-8 pb-5 flex flex-wrap gap-3">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ask about ${s}`}
                  title={`Ask about ${s}`}
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
                  placeholder="Ask about destinations, beaches, safaris, hotels..."
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="flex-1 resize-none rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm md:text-base outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100 transition shadow-sm"
                />

                <button
                  type="button"
                  aria-label="Send message"
                  title="Send message"
                  onClick={() => handleSend()}
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
        aria-label="Toggle chat assistant"
        title="Toggle chat assistant"
        onClick={() => setOpen(!open)}
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
